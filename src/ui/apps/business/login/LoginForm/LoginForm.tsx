import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { rootModule } from '@/store';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './loginForm.scss';
import { WVHButton } from '@/ui/components';

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  username: Vue;
  password: Vue;
}

@Component({
  name: 'LoginForm',
})
export class LoginForm extends VueComponent<{}, IRefs> {
  constructor() {
    super();
    this.handleKeydown = this._handleKeydown.bind(this);
  }

  public handleKeydown: (e: KeyboardEvent) => void;
  public rootStore = rootModule.context(this.$store);
  private formData = {
    email: '',
    password: '',
  };

  public mounted(): void {
    this.$refs.username.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
  }

  public beforeUnmount(): void {
    this.$refs.username.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
  }

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
        <div class={Styles['input__wrapper']}>
          <v-text-field
            ref="username"
            class={`${Styles['input--text']} ${Styles['amplifier']}`}
            label="EMAIL"
            value={this.formData.email}
            on-input={(value: string) => this.update('email', value)}
          />
        </div>
        <div class={Styles['input__wrapper']}>
          <v-text-field
            ref="password"
            class={`${Styles['input--text']} ${Styles['amplifier']}`}
            type="password"
            label="PASSWORT"
            value={this.formData.password}
            on-input={(value: string) => this.update('password', value)}
          />
        </div>
        <WVHButton primary class={Styles['submit']}>
          Einloggen
        </WVHButton>
        <router-link to={{ name: 'ForgotPassword' }} class={Styles['link--small']}>
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
