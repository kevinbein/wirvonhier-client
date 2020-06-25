import Component from 'vue-class-component';
import { LocationModule, BusinessModule } from '@/store/modules';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { FormInputField } from '@/ui';
import Styles from '../manageProfileForm.scss';
import { Business } from '@/entities';
import { IAddressComponent } from '@/services/googleMaps';

interface IAddressElement {
  label: string;
  id: keyof Business['address'];
  compType: string;
  attributes: { [key: string]: unknown };
}

interface IProps {
  formValidation: { [key: string]: boolean };
  formErrors: { [key: string]: string[] };
}
interface IRefs {
  [key: string]: HTMLDivElement | FormInputField;
  addressForm: HTMLDivElement;
  street: FormInputField;
}

@Component({
  name: 'AddressForm',
  props: {
    formValidation: {
      type: Object,
      required: true,
    },
    formErrors: {
      type: Object,
      required: true,
    },
  },
})
export class AddressForm extends VueComponent<IProps, IRefs> {
  public businessModule = BusinessModule.context(this.$store);
  public formValidation!: { [key: string]: boolean };
  public formErrors!: { [key: string]: string[] };
  public locationModule = LocationModule.context(this.$store);
  public addressFormElements: IAddressElement[] = [
    {
      label: 'Straße',
      id: 'street',
      compType: 'route',
      attributes: {
        autocomplete: 'address-line1',
        required: true,
      },
    },
    {
      label: 'Hausnummer',
      id: 'streetNumber',
      compType: 'street_number',
      attributes: {
        autocomplete: 'address-line2',
        required: true,
        disabled: true,
      },
    },
    {
      label: 'Postleitzahl',
      id: 'zip',
      compType: 'postal_code',
      attributes: {
        autocomplete: 'postal-code',
        required: true,
        disabled: true,
      },
    },
    {
      label: 'Ort',
      id: 'city',
      compType: 'locality',
      attributes: {
        autocomplete: 'address-level2',
        required: true,
        disabled: true,
      },
    },
  ];

  public get business(): Business {
    return this.businessModule.state.selectedBusiness as Business;
  }

  public async mounted(): Promise<void> {
    await this.locationModule.actions.initGoogleMaps();
    await this.locationModule.actions.initAutocomplete({
      bounds: 'currentPosition',
      fields: ['address_component'],
      input: this.$refs.street.input,
      callback: this.onPlaceChange.bind(this),
    });
  }

  public beforeDestroy(): void {
    this.locationModule.actions.destroyAutocomplete();
  }

  public onPlaceChange(addComponents?: IAddressComponent[]): void {
    this.addressFormElements.forEach((el) => {
      el.attributes.disabled = false;
      this.update({ key: el.id, value: '' });
    });
    if (!addComponents) return;
    addComponents.forEach((comp) => {
      const input = this.addressFormElements.find((el) => el.compType === comp.types[0]);
      if (!input) return;
      this.update({ key: input.id, value: comp.long_name });
    });
  }

  public update({ key, value }: { key: string; value: string }): void {
    this.$emit('update', { key: `address.${key}`, value });
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div style="display: contents">
        <h1 class={Styles['manage-profile__section-title']}>Adresse</h1>
        {this.addressFormElements.map((item) => (
          <FormInputField
            ref={item.id}
            label={item.label}
            id={item.id}
            attributes={item.attributes}
            is-valid={this.formValidation[item.id]}
            error-messages={this.formErrors[item.id]}
            value={this.business.address[item.id]}
            on-change={this.update.bind(this)}
          />
        ))}
      </div>
    );
  }
}
