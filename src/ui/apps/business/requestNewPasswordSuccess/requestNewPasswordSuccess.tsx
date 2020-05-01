import Component from 'vue-class-component';
import Styles from './requestNewPasswordSuccess.scss';
import Vue from 'vue';
import { rootModule, AppearanceModule } from '@/store';
import { WVHButton } from '@/ui/components';

@Component({
  name: 'RequestNewPasswordSuccess',
})
export class RequestNewPasswordSuccessPage extends Vue {
  public rootModule = rootModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public get email(): string {
    return this.rootModule.state.emails.support;
  }

  public get recipient(): string | (string | null)[] {
    return this.$route.query.email;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['request-new-password-success__page']}`}>
        <div class={Styles['request-new-password-success__title']}>E-Mail versendet!</div>
        <p class={`${Styles['text--primary']} ${Styles.amplifier}`}>
          Wir haben Ihnen soeben eine E-Mail an {this.recipient} gesendet, die weiter Instruktionen enthält um Ihr
          Passwort zurückzusetzen.
        </p>
        <WVHButton to={{ name: 'BusinessLogin' }} primary>
          Zurück zum Login
        </WVHButton>
        <p class={Styles['text--primary']}>
          Keine E-Mail erhalten? Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut oder kontaktieren Sie unseren
          Support unter{' '}
          <a href={`mailto:${this.email}`} target="_blank" title="E-Mail an WirVonHier senden" class={Styles.link}>
            {this.email}
          </a>
        </p>
      </div>
    );
  }
}

export default RequestNewPasswordSuccessPage;
