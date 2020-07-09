import Component from 'vue-class-component';
import Vue from 'vue';
import { BusinessModule, LocationModule, LocationState, LocationMutations, LocationActions, UserModule } from '@/store';
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
  public userModule = UserModule.context(this.$store);
  public locationModule!: Context<Module<LocationState, never, LocationMutations, LocationActions>>;
  public formModule = FormModule.context(this.$store);
  public formErrors: { [key: string]: string[] } = {};
  public formValidation: { [key: string]: boolean } = {};
  public isLoading = false;
  public formComponents = formComponents;

  public get business(): Business | null {
    return this.userModule.state.selectedBusiness;
  }

  public get businessData(): Partial<IBusinessData> {
    return this.business?.getData() || {};
  }

  public get formData(): Partial<IBusinessData> {
    return this.formModule.getters.getFormById(this.formId) || {};
  }

  public get formValues(): Partial<IBusinessData> {
    return {
      ...this.businessData,
      ...this.formData,
      address: {
        ...this.businessData.address,
        ...this.formData.address,
      },
    };
  }

  public get delivery(): { [key: string]: string } {
    return (
      this.formValues.delivery?.reduce((acc, item) => {
        return { ...acc, [item]: item };
      }, {}) || {}
    );
  }
  public get paymentMethods(): { [key: string]: string } {
    return (
      this.formValues.paymentMethods?.reduce((acc, item) => {
        return { ...acc, [item]: item };
      }, {}) || {}
    );
  }

  public created(): void {
    if (!this.$store.state.Location) {
      registerModule(this.$store, ['Location'], 'Location/', LocationModule);
    }
    this.locationModule = LocationModule.context(this.$store);
  }

  public update({ key, value }: { key: string; value: unknown }): void {
    const data = { ...this.formData };
    set(data, key, value);
    this.formModule.actions.update({ formId: this.formId, data });
  }

  public updatePaymentMethods({ key, value }: { key: IPaymentMethod; value: string }): void {
    const data = this.formData.paymentMethods || [];
    if (value) data.push(key);
    else data.filter((item) => item !== key);
    this.update({ key: 'paymentMethods', value: data });
  }

  public updateDelivery({ key, value }: { key: string; value: string }): void {
    const data = this.formData.delivery || [];
    if (value) data.push(key);
    else data.filter((item) => item !== key);
    this.update({ key: 'delivery', value: data });
  }

  public async submit(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading || !this.business) return;
    this.isLoading = true;

    const newAddress = this.formData.address;

    if (this.isAddressChanged(newAddress)) {
      const coordinates = await this.locationModule.actions.geocode(newAddress);
      this.update({ key: 'location', value: coordinates });
    }

    const success = await this.businessModule.actions.save({ businessId: this.business._id, updates: this.formData });

    if (success) {
      this.userModule.actions.selectBusiness(this.business._id);
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
            value={this.formValues[comp.id as keyof IBusinessData] || ''}
            on-change={this.update.bind(this)}
          />
        ))}

        <AddressForm
          formValidation={this.formValidation}
          formErrors={this.formErrors}
          address={this.formValues.address}
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
            value={this.formValues[comp.id as keyof IBusinessData] || ''}
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
            value={comp.id as IPaymentMethod}
            currentValue={this.paymentMethods[comp.id]}
            on-change={this.updatePaymentMethods.bind(this)}
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
            value={comp.id}
            currentValue={this.delivery[comp.id]}
            on-change={this.updateDelivery.bind(this)}
          />
        ))}
        <div class={Styles['manage-profile__submit']}>
          <WVHButton primary on-click={this.submit.bind(this)}>
            {this.isLoading ? ['', <Loader color="#fff" size={24} />] : 'SPEICHERN'}
          </WVHButton>
        </div>
      </form>
    );
  }

  private isAddressChanged(newAddress?: IAddress): newAddress is IAddress {
    if (!newAddress || !this.business) return false;
    const oldAddress = this.business.address;
    return (Object.keys(newAddress) as Array<keyof IAddress>).some((key) => newAddress[key] !== oldAddress[key]);
  }
}
