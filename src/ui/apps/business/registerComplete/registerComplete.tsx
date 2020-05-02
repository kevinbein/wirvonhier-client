import Component from 'vue-class-component';
import Vue from 'vue';
import { WVHButton } from '@/ui';
import Styles from './registerComplete.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { AppearanceModule } from '@/store';

@Component
export class RegisterComplete extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['register-complete__page']}`}>
        <div class={Styles['register-complete__title']}>Willkommen bei WirVonHier!</div>
        <p class={Styles['text--primary']}>
          Wir freuen uns Sie bei uns zu haben! Wenn Sie möchten, können Sie direkt loslegen und Ihr Händler-Profil
          erstellen.
        </p>
        <p class={Styles['text--primary']}>
          Wir haben Ihnen ebenfalls soeben eine E-Mail gesendet um Ihren Account zu verifizieren.
        </p>
        <WVHButton class={Styles['register-complete__button']} primary to={{ name: 'BusinessDashboard' }}>
          ZU MEINEM PROFIL
        </WVHButton>
      </div>
    );
  }
}

export default RegisterComplete;
