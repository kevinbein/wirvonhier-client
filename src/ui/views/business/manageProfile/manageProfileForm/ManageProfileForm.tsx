import Component from 'vue-class-component';
import Vue from 'vue';
import { BusinessModule, LocationModule, LocationState, LocationMutations, LocationActions } from '@/store';
import { Business, IBusinessData, IPaymentMethod, IAddress } from '@/entities';
import set from 'lodash/set';
import Styles from './manageProfileForm.scss';
import { WVHButton, FormTextArea, FormInputField, FormCheckbox, Loader } from '@/ui/components';
import { POSITION, TYPE } from 'vue-toastification';
import { AddressForm } from './addressForm';
import { FormModule } from '@/store/modules/form';
import { formComponents } from './formComponents';
import { registerModule, Context, Module } from 'vuex-smart-module';

@Component({
  name: 'ManageProfileForm',
  components: {
    FormInputField,
    FormTextArea,
    FormCheckbox,
  },
})
export class ManageProfileForm extends Vue {
  public formId = 'manage-profile-form';
  public businessModule = BusinessModule.context(this.$store);
  public locationModule!: Context<Module<LocationState, never, LocationMutations, LocationActions>>;
  public formModule = FormModule.context(this.$store);
  public formErrors: { [key: string]: string[] } = {};
  public formValidation: { [key: string]: boolean } = {};
  public isLoading = false;
  public formComponents = formComponents;
  public get business(): Business {
    return this.businessModule.state.selectedBusiness as Business;
  }

  public get formData(): IBusinessData {
    return this.formModule.getters.getFormById(this.formId) || {};
  }

  public created(): void {
    this.formModule.actions.update({ formId: this.formId, data: this.business.getData() });
    if (!this.$store.state.Location) {
      registerModule(this.$store, ['Location'], 'Location/', LocationModule);
    }
    this.locationModule = LocationModule.context(this.$store);
  }

  public update({ key, value }: { key: string; value: string }): void {
    // save in form
    const data = { ...this.formData };
    set(data, key, value);
    this.formModule.actions.update({ formId: this.formId, data });
    this.$forceUpdate();
  }

  public async submit(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;

    if (this.isAddressChanged()) {
      const data = { ...this.formData };
      const coordinates = await this.locationModule.actions.geocode(data.address);
      set(data, 'location', coordinates);
      this.formModule.actions.update({ formId: this.formId, data });
    }

    const success = await this.businessModule.actions.save(this.formData);

    if (success) {
      this.businessModule.actions.selectBusiness(this.business._id as string);
      this.$toast(`Profil wurde erfolgreich aktualisiert.`, {
        position: POSITION.TOP_CENTER,
        type: TYPE.SUCCESS,
        timeout: 2000,
      });
      this.isLoading = false;
    } else {
      this.$toast(`Profil konnte nicht aktualisiert werden.`, {
        position: POSITION.TOP_CENTER,
        type: TYPE.ERROR,
        timeout: 3000,
      });
      this.isLoading = false;
    }
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['manage-profile__form']}>
        {this.formComponents.sectionOne.map(({ component, ...comp }) => (
          <component
            key={comp.id}
            id={comp.id}
            label={comp.label}
            attributes={comp.attributes}
            is-valid={this.formValidation[comp.id]}
            error-messages={this.formErrors[comp.id]}
            value={this.formData[comp.id as keyof IBusinessData] || ''}
            on-change={this.update.bind(this)}
          />
        ))}

        <AddressForm
          formValidation={this.formValidation}
          formErrors={this.formErrors}
          on-update={this.update.bind(this)}
        />

        <h1 class={Styles['manage-profile__section-title']}>Kontaktdaten</h1>
        {this.formComponents.sectionContact.map(({ component, ...comp }) => (
          <component
            key={comp.id}
            id={comp.id}
            label={comp.label}
            attributes={comp.attributes}
            is-valid={this.formValidation[comp.id]}
            error-messages={this.formErrors[comp.id]}
            value={this.formData[comp.id as keyof IBusinessData] || ''}
            on-change={this.update.bind(this)}
          />
        ))}

        <h1 class={Styles['manage-profile__section-title']}>Zahlungsmethoden</h1>
        {this.formComponents.sectionPaymentMethods.map(({ component, ...comp }) => (
          <component
            key={comp.id}
            id={comp.id}
            label={comp.label}
            is-valid={this.formValidation[comp.id]}
            error-messages={this.formErrors[comp.id]}
            value={!!this.formData.paymentMethods?.includes(comp.id as IPaymentMethod)}
            on-change={this.update.bind(this)}
          />
        ))}

        <h1 class={Styles['manage-profile__section-title']}>Lieferung</h1>
        {this.formComponents.sectionDelivery.map(({ component, ...comp }) => (
          <component
            key={comp.id}
            id={comp.id}
            label={comp.label}
            is-valid={this.formValidation[comp.id]}
            error-messages={this.formErrors[comp.id]}
            value={!!this.formData.delivery?.includes(comp.id)}
            on-change={this.update.bind(this)}
          />
        ))}
        <div class={Styles['manage-profile__submit']}>
          <WVHButton primary on-click={this.submit.bind(this)}>
            {this.isLoading ? <Loader color="#fff" size={24} /> : 'SPEICHERN'}
          </WVHButton>
        </div>
      </form>
    );
  }

  private isAddressChanged(): boolean {
    const newAddress = this.formData.address;
    if (!newAddress) return false;
    const oldAddress = this.business.address;
    return (Object.keys(newAddress) as Array<keyof IAddress>).every((key) => newAddress[key] === oldAddress[key]);
  }
}
