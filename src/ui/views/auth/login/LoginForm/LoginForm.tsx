import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { AuthModule, UserModule, BusinessModule } from '@/store';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './loginForm.scss';
import SharedStyles from 'styles';
import { WVHButton, Loader } from '@/ui/components';
import { TYPE, POSITION } from 'vue-toastification';
import { VerificationToast } from '../../components';

interface IRefs {
  email: Vue;
  password: Vue;
}

interface IErrors {
  email: string[];
  password: string[];
}
@Component({
  name: 'LoginForm',
})
export class LoginForm extends VueComponent<{}, IRefs> {
  public userModule = UserModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  constructor() {
    super();
    this.handleKeydown = this._handleKeydown.bind(this);
  }

  public handleKeydown: (e: KeyboardEvent) => void;
  public authModule = AuthModule.context(this.$store);
  public isLoading = false;
  public errors: IErrors = {
    email: [],
    password: [],
  };

  private formData = {
    email: '',
    password: '',
  };

  public mounted(): void {
    this.$refs.email.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
  }

  public beforeUnmount(): void {
    this.$refs.email.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
  }

  public async login(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;
    this.errors.email = this.formData.email.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    this.errors.password = this.formData.password.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    if (this.errors.email.length > 0 || this.errors.password.length > 0) return;

    const email = this.formData.email.toLowerCase();
    const res = await this.authModule.actions.login({
      email: email,
      password: this.formData.password,
    });
    if (res.status === 'failure') {
      this.isLoading = false;
      if (res.code === 409) {
        this.$toast(
          {
            component: VerificationToast,
            props: {
              email: email,
            },
          },
          { position: POSITION.TOP_CENTER, type: TYPE.ERROR, timeout: false },
        );
      } else {
        this.$toast(res.message, { type: TYPE.ERROR, timeout: 10000, position: POSITION.TOP_CENTER });
      }
    }
    if (res.status === 'success') {
      await this.userModule.actions.loadUserAndSaveUserData();
      this.isLoading = false;
      this.$router.push({ name: 'BusinessDashboard' });
    }
  }

  public update(key: 'email' | 'password', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['login__form']}>
        <div class={SharedStyles['input__wrapper']}>
          <v-text-field
            ref="email"
            class={`${SharedStyles['input__login--text_amplifier']}`}
            label="EMAIL"
            autocomplete="email"
            error-messages={this.errors.email}
            value={this.formData.email}
            on-input={(value: string) => this.update('email', value)}
          />
        </div>
        <div class={SharedStyles['input__wrapper']}>
          <v-text-field
            ref="password"
            class={`${SharedStyles['input__login--text_amplifier']}`}
            type="password"
            label="PASSWORT"
            autocomplete="current-password"
            error-messages={this.errors.password}
            value={this.formData.password}
            on-input={(value: string) => this.update('password', value)}
          />
        </div>
        <WVHButton primary class={SharedStyles['submit']} on-click={this.login.bind(this)}>
          {this.isLoading ? <Loader color="#fff" size={24} /> : 'Einloggen'}
        </WVHButton>
        <router-link to={{ name: 'BusinessRequestNewPassword' }} class={SharedStyles['link--small']}>
          Sie haben ihr Passwort vergessen?
        </router-link>
      </form>
    );
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.login(e);
    }
  }
}

export default LoginForm;
