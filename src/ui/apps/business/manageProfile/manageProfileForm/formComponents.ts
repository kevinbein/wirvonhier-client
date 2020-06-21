import { IBusinessData, IPaymentMethod, IDeliveryOptions } from '@/entities';

interface IBusinessForm {
  [key: string]: IBusinessFormElement[];
}
interface IBusinessFormElement {
  component: 'FormInputField' | 'FormTextArea' | 'FormCheckbox';
  id: keyof IBusinessData | IPaymentMethod | IDeliveryOptions;
  label: string;
  attributes?: { [key: string]: unknown };
}

export const formComponents: IBusinessForm = {
  sectionOne: [
    {
      component: 'FormInputField',
      id: 'name',
      label: 'Geschäftsname',
      attributes: {
        required: true,
      },
    },
    {
      component: 'FormTextArea',
      id: 'description',
      label: 'Beschreiben Sie Ihr Angebot',
      attributes: {
        required: true,
        'max-length': 300,
      },
    },
  ],
  sectionContact: [
    {
      component: 'FormInputField',
      id: 'phone',
      label: 'Telefon',
      attributes: {
        required: true,
        autocomplete: 'tel',
      },
    },
    {
      component: 'FormInputField',
      id: 'email',
      label: 'E-Mail',
      attributes: {
        required: true,
        autocomplete: 'email',
        type: 'email',
      },
    },
    {
      component: 'FormInputField',
      id: 'website',
      label: 'Website',
      attributes: {
        required: true,
        autocomplete: 'url',
      },
    },
    {
      component: 'FormInputField',
      id: 'onlineShop',
      label: 'Online-Shop',
      attributes: {
        required: true,
        autocomplete: 'url',
      },
    },
    {
      component: 'FormInputField',
      id: 'facebook',
      label: 'Facebook',
      attributes: {
        required: true,
      },
    },
    {
      component: 'FormInputField',
      id: 'instagram',
      label: 'Instagram',
      attributes: {
        required: true,
      },
    },
  ],
  sectionPaymentMethods: [
    {
      component: 'FormCheckbox',
      id: 'cash',
      label: 'Barzahlung',
    },
    {
      component: 'FormCheckbox',
      id: 'paypal',
      label: 'Paypal',
    },
    {
      component: 'FormCheckbox',
      id: 'invoice',
      label: 'Rechnung',
    },
    {
      component: 'FormCheckbox',
      id: 'ondelivery',
      label: 'Nachnahme',
    },
    {
      component: 'FormCheckbox',
      id: 'sofort',
      label: 'Sofortüberweisung',
    },
    {
      component: 'FormCheckbox',
      id: 'sepa',
      label: 'Lastschrift (SEPA)',
    },
  ],
  sectionDelivery: [
    {
      component: 'FormCheckbox',
      id: 'delivery',
      label: 'Lieferung',
    },
    {
      component: 'FormCheckbox',
      id: 'collect',
      label: 'Abholung',
    },
  ],
};
