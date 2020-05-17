import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { rootModule } from '@/store';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './resetPasswordForm.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { WVHButton, Loader } from '@/ui/components';
import { TYPE, POSITION } from 'vue-toastification';

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  password: Vue;
  passwordRepeat: Vue;
}

interface IErrors {
  password: string[];
  passwordRepeat: string[];
}
@Component({
  name: 'ResetPasswordForm',
})
export class ResetPasswordForm extends VueComponent<{}, IRefs> {
  constructor() {
    super();
    this.handleKeydown = this._handleKeydown.bind(this);
  }

  public handleKeydown: (e: KeyboardEvent) => void;
  public rootStore = rootModule.context(this.$store);
  public isLoading = false;

  public token = '';
  public errors: IErrors = {
    password: [],
    passwordRepeat: [],
  };

  private formData = {
    password: '',
    passwordRepeat: '',
  };

  public beforeMount(): void {
    this.token = typeof this.$route.query.token === 'string' ? this.$route.query.token : '';
    if (!this.token) {
      this.$router.push({ name: 'BusinessLanding' });
    }
  }

  public mounted(): void {
    this.$refs.password.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
    this.$refs.passwordRepeat.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
  }

  public beforeUnmount(): void {
    this.$refs.password.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
    this.$refs.passwordRepeat.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
  }

  public async resetPassword(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;

    this.errors.password = this.formData.password.length === 0 ? ['Bitte gib deine E-Mail Adresse ein.'] : [];
    this.errors.passwordRepeat =
      this.formData.password !== this.formData.passwordRepeat ? ['Die Passwörter stimmen nicht überein.'] : [];
    if (this.errors.password.length > 0 || this.errors.passwordRepeat.length > 0) {
      this.isLoading = false;
      return;
    }

    const res = await this.rootStore.actions.resetPassword({
      password: this.formData.password,
      token: this.token,
    });
    if (res.status === 'failure') {
      this.$toast(res.message, { type: TYPE.ERROR, timeout: 10000, position: POSITION.TOP_CENTER });
    }
    if (res.status === 'success') {
      this.$router.push({ name: 'BusinessResetPasswordSuccess' });
    }
    this.isLoading = false;
  }

  public update(key: 'password' | 'passwordRepeat', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['request-new-password__form']}>
        <div class={SharedStyles['input__wrapper']}>
          <v-text-field
            ref="password"
            class={`${SharedStyles['input__login--text_amplifier']}`}
            label="NEUES PASSWORT"
            autocomplete="new-password"
            error-messages={this.errors.password}
            value={this.formData.password}
            on-input={(value: string) => this.update('password', value)}
          />
        </div>
        <div class={SharedStyles['input__wrapper']}>
          <v-text-field
            ref="passwordRepeat"
            class={`${SharedStyles['input__login--text_amplifier']}`}
            label="PASSWORT WIEDERHOLEN"
            autocomplete="new-password"
            error-messages={this.errors.passwordRepeat}
            value={this.formData.passwordRepeat}
            on-input={(value: string) => this.update('passwordRepeat', value)}
          />
        </div>
        <WVHButton primary class={SharedStyles['submit']} on-click={this.resetPassword.bind(this)}>
          {this.isLoading ? <Loader color="#fff" size={24} /> : 'PASSWORT ZURÜCKSETZEN'}
        </WVHButton>
      </form>
    );
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.resetPassword(e);
    }
  }
}

export default ResetPasswordForm;
