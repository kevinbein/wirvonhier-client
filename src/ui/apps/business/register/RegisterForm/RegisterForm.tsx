import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { rootModule } from '@/store';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './registerForm.scss';
import { WVHButton } from '@/ui/components';
import { TYPE, POSITION } from 'vue-toastification';
import { DataProtStatementComponent } from '@/ui/components/formElements';

interface IRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
  email: Vue;
  password: Vue;
  passwordRepeat: Vue;
}

interface IErrors {
  email: string[];
  password: string[];
  passwordRepeat: string[];
  dataProtStatement: string[];
}

@Component({
  name: 'RegisterForm',
})
export class RegisterForm extends VueComponent<{}, IRefs> {
  constructor() {
    super();
    this.handleKeydown = this._handleKeydown.bind(this);
  }

  public handleKeydown: (e: KeyboardEvent) => void;
  public rootStore = rootModule.context(this.$store);
  public errors: IErrors = {
    email: [],
    password: [],
    passwordRepeat: [],
    dataProtStatement: [],
  };

  private formData = {
    email: '',
    password: '',
    passwordRepeat: '',
    dataProtStatementLang: 'de',
    dataProtStatement: '',
  };

  public mounted(): void {
    this.$refs.email.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
    this.$refs.passwordRepeat.$el.querySelector('input')?.addEventListener('keydown', this.handleKeydown);
  }

  public beforeUnmount(): void {
    this.$refs.email.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
    this.$refs.password.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
    this.$refs.passwordRepeat.$el.querySelector('input')?.removeEventListener('keydown', this.handleKeydown);
  }

  public async register(e: Event): Promise<void> {
    e.preventDefault();
    this.errors.email = this.formData.email.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    this.errors.password = this.formData.password.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    this.errors.passwordRepeat =
      this.formData.password !== this.formData.passwordRepeat ? ['Die Passwörter stimmen nicht überein.'] : [];
    this.errors.dataProtStatement =
      this.formData.dataProtStatement.length === 0
        ? ['Bitte akzeptieren Sie unsere Datenschutzerklärung und AGBs.']
        : [];
    if (
      this.errors.email.length > 0 ||
      this.errors.password.length > 0 ||
      this.errors.passwordRepeat.length > 0 ||
      this.errors.dataProtStatement.length > 0
    )
      return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordRepeat, ...payload } = this.formData;
    const res = await this.rootStore.actions.register(payload);
    if (res.status === 'failure') {
      this.$toast(res.message, { type: TYPE.ERROR, timeout: 15000, position: POSITION.TOP_CENTER });
    }
    if (res.status === 'success') {
      this.$router.push({ name: 'BusinessRegisterComplete' });
    }
  }

  public update(key: 'email' | 'password' | 'passwordRepeat' | 'dataProtStatement', value: string): void {
    this.formData[key] = value;
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['register__form']}>
        <div class={Styles['input__wrapper']}>
          <v-text-field
            ref="email"
            class={`${Styles['input--text']} ${Styles['amplifier']}`}
            label="EMAIL"
            autocomplete="email"
            error-messages={this.errors.email}
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
            autocomplete="new-password"
            error-messages={this.errors.password}
            value={this.formData.password}
            on-input={(value: string) => this.update('password', value)}
          />
        </div>
        <div class={Styles['input__wrapper']}>
          <v-text-field
            ref="passwordRepeat"
            class={`${Styles['input--text']} ${Styles['amplifier']}`}
            type="password"
            autocomplete="new-password"
            label="PASSWORT WIEDERHOLEN"
            error-messages={this.errors.passwordRepeat}
            value={this.formData.passwordRepeat}
            on-input={(value: string) => this.update('passwordRepeat', value)}
          />
        </div>
        <div class={Styles['input__wrapper']}>
          <DataProtStatementComponent
            error-messages={this.errors.dataProtStatement}
            value={!!this.formData.dataProtStatement}
            on-update-value={(value: string) => this.update('dataProtStatement', value)}
          />
        </div>
        <WVHButton primary class={Styles['submit']} on-click={this.register.bind(this)}>
          Registrieren
        </WVHButton>
      </form>
    );
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.register(e);
    }
  }
}