import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './login.scss';
import { rootModule } from '@/store';

@Component({
  name: 'BusinessLogin',
})
export class BusinessLoginPage extends Vue {
  private formData = {
    email: '',
    password: '',
  };
  public rootStore = rootModule.context(this.$store);

  public async login(e: Event): Promise<void> {
    e.preventDefault();
    if (this.formData.email.length == 0 || this.formData.password.length == 0) {
      return;
    }

    const res = await this.rootStore.actions.login({
      email: this.formData.email,
      password: this.formData.password,
    });
    if (res.status === 'failure') {
      // eslint-disable-next-line no-console
      console.log(res);
    }
    if (res.status === 'success') {
      this.$router.push({ name: 'BusinessNavigation' });
    }
  }

  public update(key: 'email' | 'password', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        <div class={Styles['logo-container']}>
          <img class={Styles['logo']} src="/assets/imgs/wvh-pre-login_1500px.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['title']}>Hi,</div>
            <div class={Styles['desc']}>
              {/*schön Sie zu sehen! Bitte treten Sie Ihrem Profil bei oder registrieren Sie sich hier!*/}
              schön Sie zu sehen! Bitte melden Sie sich unten an um Ihr Profil zu verwalten.
            </div>
          </div>
        </div>
        <form>
          <div class={Styles['buttons']}>
            <div class={Styles['button-container']}>
              <v-text-field
                ref="inputUsername"
                class={Styles['text-input']}
                label="EMAIL"
                value={this.formData.email}
                on-input={(value: string) => this.update('email', value)}
              ></v-text-field>
            </div>
            <div class={Styles['button-container']}>
              <v-text-field
                ref="inputPassword"
                class={Styles['text-input']}
                type="password"
                label="PASSWORT"
                value={this.formData.password}
                on-input={(value: string) => this.update('password', value)}
              ></v-text-field>
              <v-icon on-click={this.login.bind(this)} class={Styles['continue-icon']}>
                fa-chevron-right
              </v-icon>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BusinessLoginPage;
