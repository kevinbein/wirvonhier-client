import Vue from 'vue';
import Component from 'vue-class-component';
import { CreateElement } from 'vue/types/umd';
import Styles from './profile.scss';

type profile = {
  name: string;
  street: string;
  city: string;
  phone: string;
  email: string;
  homepage: string;
  description: string;
  updated: Date;
};

@Component
export class ProfilePage extends Vue {
  get profile(): profile {
    return {
      name: 'Musikhaus Lange',
      street: 'Marktstraße 27',
      city: 'Ravensburg',
      phone: '0751 359000',
      email: 'info@musikhaus-lange.de',
      homepage: 'https://www.musikhaus-lange.de',
      description:
        'Das Musikhaus Lange ist ein traditionelles Fachgeschäft für Musikinstrumente in Ravensburg. Wir bieten eine große Auswahl an Instrumenten',
      updated: new Date(),
    };
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    //const businessId = this.$route.params.businessId;
    //const db = this.$store.$db.businesses;
    //console.log(businessId, db.find({}));

    return (
      <div class={Styles['profile-page']}>
        {/*<v-app-bar>
          <div class={Styles['hidden-button']}></div>
          <v-spacer></v-spacer>
          <v-toolbar-title>{this.profile.name}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-app-bar>*/}

        <div class={Styles['shop-title']}>{this.profile.name}</div>

        <div class={Styles['information-bar']}>
          <div class={Styles['features']}>
            <div class={Styles.feature}>Lieferung</div>
            <div class={Styles.feature}>Bezahlung</div>
          </div>
          <div class={Styles['contacts']}>
            <div class={Styles['contact']}>
              <v-icon class={Styles['icon']}>fab fa-twitter</v-icon>
            </div>
            <div class={Styles['contact']}>
              <v-icon class={Styles['icon']}>fab fa-facebook</v-icon>
            </div>
            <div class={Styles['contact']}>
              <v-icon class={Styles['icon']}>fab fa-instagram</v-icon>
            </div>
          </div>
        </div>

        <div class={Styles['profile-image-container']}>
          <img class={Styles['profile-image']} src="/assets/imgs/laden.png" />
        </div>

        <div class={Styles['details-container']}>
          <div class={Styles['details']}>
            <div class={Styles['left-side']}>
              <div class={Styles['title']}>Adresse</div>
              <div class={Styles['description']}>
                {this.profile.street}
                <br />
                {this.profile.city}
              </div>
              <br />
              <div class={Styles['title']}>Kontakt</div>
              <div class={Styles['description']}>
                {this.profile.phone}
                <br />
                {this.profile.email}
                <br />
                {this.profile.homepage}
              </div>
            </div>
            <div class={Styles['right-side']}>
              <div class={Styles['title']}>Angebot</div>
              <div class={Styles['description']}>{this.profile.description}</div>
              <br />
              <div class={Styles['title']}>Aktualisiert am {this.profile.updated.toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div class={Styles['button-row-container']}>
          <div class={Styles['button-row']}>
            <div class={Styles['button']}>
              <v-icon>fa-phone</v-icon>
            </div>
            <div class={Styles['button']}>
              <v-icon>fa-video</v-icon>
            </div>
            <div class={Styles['button']}>
              <v-icon>fab fa-whatsapp</v-icon>
            </div>
            <div class={Styles['button']}>
              <v-icon>fa-envelope</v-icon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
