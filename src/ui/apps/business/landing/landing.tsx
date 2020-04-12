import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';

@Component({
  name: 'BusinessLanding',
})
export class BusinessLandingPage extends Vue {
  private username = '';
  private password = '';

  public login(): void {
    if (this.username.length == 0 || this.password.length == 0) {
      //return;
    }

    window.localStorage.loginToken = 'iamalogintoken';

    this.$router.push('business/profile');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    const errorUsernameClass = this.username.length > 0 ? 'error' : '';
    return (
      <div class={Styles['landing-page']}>
        <div class={Styles['logo-container']}>
          <img class={Styles['logo']} src="./assets/imgs/wvh-pre-login_1500px.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['title']}>Hi,</div>
            <div class={Styles['desc']}>
              {/*schön Sie zu sehen! Bitte treten Sie Ihrem Profil bei oder registrieren Sie sich hier!*/}
              schön Sie zu sehen! Bitte melden Sie sich unten an um Ihr Profil zu verwalten.
            </div>
          </div>
        </div>
        <div class={Styles['buttons']}>
          <div class={Styles['button-container']}>
            <v-text-field
              ref="inputUsername"
              class={Styles['text-input'] + ' ' + errorUsernameClass}
              label="BENUTZERNAME"
              value={this.username}
            ></v-text-field>
          </div>
          <div class={Styles['button-container']}>
            <v-text-field
              ref="inputPassword"
              class={Styles['text-input']}
              type="password"
              label="PASSWORT"
              value={this.password}
            ></v-text-field>
            <v-icon on-click={() => this.login()} class={Styles['continue-icon']}>
              fa-chevron-right
            </v-icon>
          </div>
        </div>
      </div>
    );
  }
}
