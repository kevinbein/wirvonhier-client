import Component from 'vue-class-component';
import Styles from './resetPassword.scss';
import Vue from 'vue';
import { ResetPasswordForm } from './ResetPasswordForm';
import { AppearanceModule } from '@/store';

@Component({
  name: 'BusinessResetPassword',
})
export class BusinessResetPasswordPage extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['reset-password__page']}`}>
        <div class={Styles['reset-password__title']}>Passwort zurücksetzen</div>
        <ResetPasswordForm />
      </div>
    );
  }
}

export default BusinessResetPasswordPage;
