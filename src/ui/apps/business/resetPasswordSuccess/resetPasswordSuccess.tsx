import Component from 'vue-class-component';
import Styles from './resetPasswordSuccess.scss';
import Vue from 'vue';
import { AppearanceModule } from '@/store';
import { WVHButton } from '@/ui/components';

@Component({
  name: 'RequestNewPasswordSuccess',
})
export class RequestNewPasswordSuccessPage extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['reset-password-success__page']}`}>
        <div class={Styles['reset-password-success__title']}>Passwort erfolgreich geändert!</div>
        <WVHButton to={{ name: 'BusinessDashboard' }} primary>
          Zurück zum Dashboard
        </WVHButton>
      </div>
    );
  }
}

export default RequestNewPasswordSuccessPage;
