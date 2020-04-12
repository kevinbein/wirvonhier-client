import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './information.scss';
import { ProfileLoader } from './../components/profileLoader';
import { LogoutButton } from '../components';
//import { db } from '@/db_tmp';
//import { WVHButton } from '@/ui/components';

@Component({
  name: 'BusinessInformation',
})
export class BusinessInformationPage extends Vue {
  public deliverySelection = [{ label: 'Ja', value: 'collect' }];
  public paymentMethodSelection = [
    { label: 'Rechnung', value: 'invoice' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bar', value: 'cash' },
    { label: 'Kreditkarte', value: 'creditcard' },
    { label: 'Sofort', value: 'sofort' },
  ];

  public sections = [
    {
      title: 'Geschäfft',
      fields: [
        { ref: 'inputName', label: 'Name', field: ['name'] },
        { ref: 'inputDescription', label: 'Description', field: ['description'], textarea: true },
      ],
    },
    {
      title: 'Addresse',
      fields: [
        { ref: 'inputAddressStreet', label: 'Straße', field: ['address', 'street'] },
        { ref: 'inputAddressStreetNumber', label: 'Straßennummer', field: ['address', 'streetNumber'] },
        { ref: 'inputAddressZip', label: 'PLZ', field: ['address', 'zip'] },
        { ref: 'inputAddressCity', label: 'Stadt', field: ['address', 'city'] },
        { ref: 'inputAddressCountry', label: 'Land', field: ['address', 'country'], disabled: true },
      ],
    },
    {
      title: 'Persönliches',
      fields: [
        { ref: 'inputOwnerFirstName', label: 'Vorname', field: ['ownerFirstName'] },
        { ref: 'inputOwnerLastName', label: 'Nachname', field: ['ownerLastName'] },
      ],
    },
    {
      title: 'Kontakt',
      fields: [
        { ref: 'inputPhone', label: 'Telefon', field: ['phone'] },
        { ref: 'inputWhatsapp', label: 'Whatsapp', field: ['whatsapp'] },
        { ref: 'inputInstagram', label: 'Instagram', field: ['instagram'] },
        { ref: 'inputFacebook', label: 'Facebook', field: ['facebook'] },
        { ref: 'inputEmail', label: 'Email', field: ['email'], disabled: true },
      ],
    },
    {
      title: 'Verschiedenes',
      fields: [
        { ref: 'inputDelivery', label: 'Lieferung', field: ['delivery'], selection: this.deliverySelection },
        {
          ref: 'inputPaymentMethods',
          label: 'Bezahlung',
          field: ['paymentMethods'],
          selection: this.paymentMethodSelection,
        },
        { ref: 'inputCategory', label: 'Kategorien (Komma getrennt)', field: ['category'], listInput: true },
      ],
    },
  ];

  public save(): void {
    this.isSaved = true;
  }

  public isSaved = true;
  public profileChanged(): void {
    this.isSaved = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadedProfile(profile: any): void {
    this.profile = profile;
    this.$watch(
      () => this.profile,
      () => this.profileChanged(),
      { deep: true },
    );
  }

  public gotoProfile(): void {
    this.$router.push('/business/profile');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <ProfileLoader on-loadedProfile={(profile: any) => this.loadedProfile(profile)}>
        {this.profile !== null && (
          <div class={Styles['information-page-container']}>
            <v-app-bar dense class={Styles['nav-bar']}>
              <v-btn icon on-click={() => this.gotoProfile()}>
                <v-icon class={Styles['back-icon']}>fa-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-toolbar-title>Profil{this.isSaved ? '' : '*'}</v-toolbar-title>
              <v-spacer />
              <v-btn icon disabled={this.isSaved}>
                {(this.isSaved && (
                  <v-icon on-click={() => this.save()} class={Styles['check-icon']}>
                    fa-check
                  </v-icon>
                )) || (
                  <v-icon on-click={() => this.save()} class={Styles['save-icon']}>
                    fa-save
                  </v-icon>
                )}
              </v-btn>
            </v-app-bar>
            <div class={Styles['information-page']}>
              <div class={Styles['editor']}>
                {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.sections.map((section: any) => {
                  return (
                    <div class={Styles['section']}>
                      <div class={Styles['title']}>{section.title}</div>
                      <div class={Styles['inputs']}>
                        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                        section.fields.map((field: any) => {
                          if (field.selection !== undefined) {
                            return (
                              <div class={Styles['selection']}>
                                <div class={Styles['label']}>{field.label}</div>
                                {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                                field.selection.map((selection: any) => {
                                  return (
                                    <v-switch
                                      class={Styles['switch']}
                                      label={selection.label}
                                      value={selection.value}
                                      onChange={() => this.profileChanged()}
                                    ></v-switch>
                                  );
                                })}
                              </div>
                            );
                          } else {
                            return (
                              (field.textarea && (
                                <v-textarea
                                  ref={field.ref}
                                  label={field.label}
                                  value={
                                    field.field.length == 2
                                      ? this.profile[field.field[0]][field.field[1]]
                                      : this.profile[field.field[0]]
                                  }
                                  onChange={() => this.profileChanged()}
                                  disabled={field.disabled === true}
                                  outlined
                                ></v-textarea>
                              )) || (
                                <v-text-field
                                  ref={field.ref}
                                  label={field.label}
                                  value={
                                    field.field.length == 2
                                      ? this.profile[field.field[0]][field.field[1]]
                                      : this.profile[field.field[0]]
                                  }
                                  onChange={() => this.profileChanged()}
                                  disabled={field.disabled === true}
                                  outlined
                                ></v-text-field>
                              )
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <LogoutButton />
            </div>
          </div>
        )}
      </ProfileLoader>
    );
  }
}
