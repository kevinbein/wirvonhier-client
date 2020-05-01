import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './register.scss';
import { rootModule } from '@/store';
import { DataProtStatementComponent } from '@/ui/components/formElements';

@Component({
  name: 'BusinessRegister',
})
export class BusinessRegisterPage extends Vue {
  private formData = {
    email: '',
    password: '',
    dataProtStatementLang: 'de',
    dataProtStatement: '',
  };
  public rootStore = rootModule.context(this.$store);

  public async register(e: Event): Promise<void> {
    e.preventDefault();
    if (
      this.formData.email.length == 0 ||
      this.formData.password.length == 0 ||
      this.formData.dataProtStatement.length == 0
    ) {
      return;
    }

    const res = await this.rootStore.actions.register(this.formData);
    if (res.status === 'failed') {
      // eslint-disable-next-line no-console
      console.log(res);
    }
    if (res.status === 'success') {
      this.$router.push({ name: 'BusinessDashboard' });
    }
  }

  public update(key: 'email' | 'password' | 'dataProtStatement', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        <div class={Styles['logo-container']}>
          <img class={Styles['logo']} src="/assets/imgs/wvh-pre-login_1500px.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['title']}>Willkommen bei WirVonHier!</div>
            <div class={Styles['desc']}>
              Bevor Sie sich ein Profil anlegen können, erstellen Sie ich bitte einen Account bei uns.
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
            </div>
            <div class={Styles['button-container']}>
              <DataProtStatementComponent
                value={!!this.formData.dataProtStatement}
                on-update-value={(value: string) => this.update('dataProtStatement', value)}
              />
            </div>
            <div class={Styles['button-container']}>
              <button class={Styles.button} on-click={this.register.bind(this)}>
                Registrieren
              </button>
            </div>
            <div class={Styles['button-container']}>
              <div class={Styles['to-login']}>Sie haben schon einen Account?</div>
              <router-link to={{ name: 'BusinessLogin' }} class={Styles.button}>
                Zum Login
              </router-link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BusinessRegisterPage;
