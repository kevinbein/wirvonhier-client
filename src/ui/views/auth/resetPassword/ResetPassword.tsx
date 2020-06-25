import Component from 'vue-class-component';
import Styles from './resetPassword.scss';
import SharedStyles from 'styles';
import Vue from 'vue';
import { ResetPasswordForm } from './ResetPasswordForm';
import { AppearanceModule } from '@/store';

@Component({
  name: 'BusinessResetPassword',
})
export class ResetPassword extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['reset-password__page']}`}>
        <div class={Styles['reset-password__title']}>Passwort zurücksetzen</div>
        <p>Bitte setze ein neues Passwort.</p>
        <ResetPasswordForm />
      </div>
    );
  }
}
