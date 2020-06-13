import Component from 'vue-class-component';
import Vue from 'vue';
import { BusinessModule } from '@/store';
import { Business } from '@/entities';
import Styles from './manageProfileForm.scss';
import { WVHButton, FormTextArea, FormInputField, FormCheckbox, Loader } from '@/ui/components';
import { POSITION, TYPE } from 'vue-toastification';

@Component({
  name: 'ManageProfileForm',
})
export class ManageProfileForm extends Vue {
  public businessModule = BusinessModule.context(this.$store);
  public formErrors: { [key: string]: string[] } = {};
  public formValidation: { [key: string]: boolean } = {};
  public isLoading = false;

  public get business(): Business {
    return this.businessModule.state.selectedBusiness as Business;
  }

  public async update({ key, value }: { key: string; value: string }): Promise<void> {
    const { field, status } = await this.businessModule.actions.update({
      business: this.business,
      key,
      value,
    });
    if (status === 'failure') {
      this.formErrors[field.key] = field.errors;
      this.formValidation[field.key] = false;
    }
    if (status === 'success') {
      this.formErrors[field.key] = [];
      this.formValidation[field.key] = true;
    }
    this.$forceUpdate();
  }

  public async submit(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;
    const success = await this.businessModule.actions.save(this.business);
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
        <FormInputField
          label="Geschäftname"
          autocomplete="off"
          id="name"
          required={true}
          is-valid={this.formValidation.name}
          error-messages={this.formErrors.name}
          value={this.business.name}
          on-change={this.update.bind(this)}
        />
        <FormTextArea
          label="Beschreiben Sie Ihr Angebot"
          id="description"
          max-length={300}
          required={true}
          is-valid={this.formValidation.description}
          error-messages={this.formErrors.description}
          value={this.business.description}
          on-change={this.update.bind(this)}
        />
        <h1 class={Styles['manage-profile__section-title']}>Adresse</h1>
        <FormInputField
          label="Straße"
          autocomplete="address-line1"
          id="address.street"
          required={true}
          is-valid={this.formValidation.streetNumber}
          error-messages={this.formErrors.street}
          value={this.business.address.street}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Hausnummer"
          id="address.streetNumber"
          required={true}
          autocomplete="address-line2"
          is-valid={this.formValidation.streetNumber}
          error-messages={this.formErrors.streetNumber}
          value={this.business.address.streetNumber}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Postleitzahl"
          id="address.zip"
          required={true}
          autocomplete="postal-code"
          is-valid={this.formValidation.zip}
          error-messages={this.formErrors.zip}
          value={this.business.address.zip}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Ort"
          id="address.city"
          required={true}
          autocomplete="address-level2"
          is-valid={this.formValidation.city}
          error-messages={this.formErrors.city}
          value={this.business.address.city}
          on-change={this.update.bind(this)}
        />
        <h1 class={Styles['manage-profile__section-title']}>Kontaktdaten</h1>
        <FormInputField
          label="Telefon"
          id="phone"
          required={true}
          autocomplete="tel"
          is-valid={this.formValidation.phone}
          error-messages={this.formErrors.phone}
          value={this.business.phone}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="E-Mail"
          id="email"
          required={true}
          type="email"
          autocomplete="tel"
          is-valid={this.formValidation.email}
          error-messages={this.formErrors.email}
          value={this.business.email}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Website"
          id="website"
          required={true}
          type="text"
          autocomplete="url"
          is-valid={this.formValidation.email}
          error-messages={this.formErrors.email}
          value={this.business.website}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Online-Shop"
          id="onlineShop"
          required={true}
          type="text"
          autocomplete="url"
          is-valid={this.formValidation.onlineShop}
          error-messages={this.formErrors.onlineShop}
          value={this.business.onlineShop}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Facebook"
          id="facebook"
          required={true}
          type="text"
          autocomplete="off"
          is-valid={this.formValidation.facebook}
          error-messages={this.formErrors.facebook}
          value={this.business.facebook}
          on-change={this.update.bind(this)}
        />
        <FormInputField
          label="Instagram"
          id="instagram"
          required={true}
          type="text"
          autocomplete="off"
          is-valid={this.formValidation.instagram}
          error-messages={this.formErrors.instagram}
          value={this.business.instagram}
          on-change={this.update.bind(this)}
        />
        <h1 class={Styles['manage-profile__section-title']}>Zahlungsmethoden</h1>
        <FormCheckbox
          label="Barzahlung"
          id="cash"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('cash')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Paypal"
          id="paypal"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('paypal')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Rechnung"
          id="invoice"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('invoice')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Nachname"
          id="ondelivery"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('ondelivery')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Sofortüberweisung"
          id="sofort"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('sofort')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Lastschrift (SEPA)"
          id="sepa"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('sepa')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Amazon Payment"
          id="amazon"
          error-messages={this.formErrors.paymentMethods}
          value={this.business.paymentMethods.includes('amazon')}
          on-change={this.update.bind(this)}
        />
        <h1 class={Styles['manage-profile__section-title']}>Lieferung</h1>
        <FormCheckbox
          label="Lieferung"
          id="delivery"
          error-messages={this.formErrors.delivery}
          value={this.business.delivery.includes('delivery')}
          on-change={this.update.bind(this)}
        />
        <FormCheckbox
          label="Abholung"
          id="collect"
          error-messages={this.formErrors.delivery}
          value={this.business.delivery.includes('collect')}
          on-change={this.update.bind(this)}
        />
        <div class={Styles['manage-profile__submit']}>
          <WVHButton primary on-click={this.submit.bind(this)}>
            {this.isLoading ? <Loader color="#fff" size={24} /> : 'SPEICHERN'}
          </WVHButton>
        </div>
      </form>
    );
  }
}
