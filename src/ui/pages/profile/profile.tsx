import Vue from 'vue';
import Component from 'vue-class-component';
import { CreateElement } from 'vue/types/umd';
import Styles from './profile.scss';

@Component
export class ProfilePage extends Vue {
  get profile() {
    return {
      name: 'Test Shop',
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

  render(h: CreateElement): Vue.VNode {
    const businessId = this.$route.params.businessId;
    const db = this.$store.$db.businesses;
    console.log(businessId, db.find({}));

    return (
      <div class={Styles['profile-page']}>
        <v-app-bar>
          <div class={Styles['hidden-button']}></div>
          <v-spacer></v-spacer>
          <v-toolbar-title>{this.profile.name}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-app-bar>

        <div class={Styles['features']}>
          <v-chip outlined class={Styles.feature}>
            Lieferung
          </v-chip>
          <v-chip outlined class={Styles.feature}>
            Bezahlung
          </v-chip>
          <v-chip outlined class={Styles.feature}>
            Social
          </v-chip>
        </div>

        <div class={Styles['profile-image-container']}>
          <img class={Styles['profile-image']} src="/assets/imgs/laden.png" />
        </div>

        <v-container class={Styles['details']}>
          <v-row>
            <v-col>
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
            </v-col>
            <v-col>
              <div class={Styles['title']}>Angebot</div>
              <div class={Styles['description']}>{this.profile.description}</div>
              <br />
              <div class={Styles['title']}>Aktualisiert am {this.profile.updated.toLocaleDateString()}</div>
            </v-col>
          </v-row>
        </v-container>

        <v-container class={Styles['button-row']}>
          <v-row>
            <v-col>
              <v-btn fab>
                <v-icon>fa-phone</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn fab>
                <v-icon>fa-home</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn fab>
                <v-icon>fab fa-whatsapp</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn fab>
                <v-icon>fab fa-instagram</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    );
  }
}
