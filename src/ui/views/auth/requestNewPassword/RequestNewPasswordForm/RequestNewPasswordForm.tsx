import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { AuthModule } from '@/store';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './requestNewPasswordForm.scss';
import SharedStyles from 'styles';
import { WVHButton, Loader } from '@/ui/components';
import { TYPE, POSITION } from 'vue-toastification';

interface IRefs {
  email: Vue;
}

interface IErrors {
  email: string[];
}
@Component({
  name: 'RequestNewPasswordForm',
})
export class RequestNewPasswordForm extends VueComponent<{}, IRefs> {
  constructor() {
    super();
    this.handleKeydown = this._handleKeydown.bind(this);
  }

  public handleKeydown: (e: KeyboardEvent) => void;
  public authModule = AuthModule.context(this.$store);
  public isLoading = false;
  public errors: IErrors = {
    email: [],
  };

  private formData = {
    email: '',
  };

  public mounted(): void {
    this.$refs.email.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
  }

  public beforeUnmount(): void {
    this.$refs.email.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
  }

  public async requestNewPassword(e: Event): Promise<void> {
    e.preventDefault();
    if (this.isLoading) return;
    this.isLoading = true;
    // TODO: Verify Email with RegEX
    this.errors.email = this.formData.email.length === 0 ? ['Bitte gib deine E-Mail Adresse ein.'] : [];
    if (this.errors.email.length > 0) return;

    const res = await this.authModule.actions.requestNewPassword({
      email: this.formData.email.toLowerCase(),
    });
    if (res.status === 'failure') {
      this.$toast(res.message, { type: TYPE.ERROR, timeout: 10000, position: POSITION.TOP_CENTER });
      this.isLoading = false;
    }
    if (res.status === 'success') {
      this.isLoading = false;
      this.$router.push({ name: 'BusinessRequestNewPasswordSuccess', query: { email: this.formData.email } });
    }
  }

  public update(key: 'email', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['request-new-password__form']}>
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
        <WVHButton primary class={SharedStyles['submit']} on-click={this.requestNewPassword.bind(this)}>
          {this.isLoading ? <Loader color="#fff" size={24} /> : 'PASSWORT ZURÜCKSETZEN'}
        </WVHButton>
      </form>
    );
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.requestNewPassword(e);
    }
  }
}

export default RequestNewPasswordForm;
