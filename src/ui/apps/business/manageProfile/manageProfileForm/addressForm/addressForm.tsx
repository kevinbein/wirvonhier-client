import Component from 'vue-class-component';
import { registerModule, Context, Module } from 'vuex-smart-module';
import { LocationModule, LocationState, LocationGetters, LocationMutations, LocationActions } from '@/store/modules';
import { VueComponent } from '@/ui/vue-ts-component';
import { FormInputField } from '@/ui';
import Styles from '../manageProfileForm.scss';
import { noop } from 'vuex-smart-module/lib/utils';

interface IComponentForm {
  streetNumber: 'short_name';
  route: 'long_name';
  locality: 'long_name';
  administrativeAreaLevel1: 'short_name';
  country: 'long_name';
  postalCode: 'short_name';
}
interface IProps {
  formValidation: { [key: string]: boolean };
  formErrors: { [key: string]: string[] };
}
interface IRefs {
  [key: string]: FormInputField;
  autocomplete: FormInputField;
}

@Component({
  name: 'AddressForm',
})
export class AddressForm extends VueComponent<IProps, IRefs> {
  public formValidation!: { [key: string]: boolean };
  public formErrors!: { [key: string]: string[] };
  public locationModule!: Context<Module<LocationState, LocationGetters, LocationMutations, LocationActions>>;
  public addressString = '';
  public autoComplete!: google.maps.places.Autocomplete;
  public componentForm: IComponentForm = {
    streetNumber: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrativeAreaLevel1: 'short_name',
    country: 'long_name',
    postalCode: 'short_name',
  };

  public async created(): Promise<void> {
    registerModule(this.$store, ['Location'], 'Location/', LocationModule);
    this.locationModule = LocationModule.context(this.$store);
    await this.locationModule.actions.initGoogleMaps();
    this.initAutocomplete();
  }

  public geolocate(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
        this.autoComplete.setBounds(circle.getBounds());
      });
    }
  }
  private fillInAddress(): void {
    // Get the place details from the autocomplete object.
    const place = this.autoComplete.getPlace();

    for (const component in this.componentForm) {
      this.$refs[component].input.value = '';
      this.$refs[component].input.disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    if (!place.address_components) return;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0] as keyof IComponentForm;
      if (this.componentForm[addressType]) {
        const val = place.address_components[i][this.componentForm[addressType]];
        this.$refs[addressType].input.value = val;
      }
    }
  }

  private initAutocomplete(): void {
    this.autoComplete = new google.maps.places.Autocomplete(this.$refs.autocomplete.input, { types: ['geocode'] });
    this.autoComplete.setFields(['address_component']);
    this.autoComplete.addListener('place_changed', this.fillInAddress.bind(this));
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div style="display: contents">
        <h1 class={Styles['manage-profile__section-title']}>Adresse</h1>
        <FormInputField
          ref="autocomplete"
          label="Straße"
          autocomplete="address-line1"
          id="address.street"
          is-valid={true}
          error-messages={[]}
          value={this.addressString}
          on-change={noop}
        />
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
      </div>
    );
  }
}
