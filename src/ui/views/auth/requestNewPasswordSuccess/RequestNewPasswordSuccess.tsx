import Component from 'vue-class-component';
import Styles from './requestNewPasswordSuccess.scss';
import SharedStyles from 'styles';
import Vue from 'vue';
import { WVHModule, AppearanceModule } from '@/store';
import { WVHButton } from '@/ui/components';

@Component({
  name: 'RequestNewPasswordSuccess',
})
export class RequestNewPasswordSuccess extends Vue {
  public wvhModule = WVHModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public get email(): string {
    return this.wvhModule.state.emails.support;
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
      <div class={`${SharedStyles.page} ${Styles['request-new-password-success__page']}`}>
        <div class={Styles['request-new-password-success__title']}>E-Mail versendet!</div>
        <p class={`${Styles['text--primary']} ${Styles.amplifier}`}>
          Wir haben Ihnen soeben eine E-Mail an <b>{this.recipient}</b> gesendet, die weitere Instruktionen enthält um
          Ihr Passwort zurückzusetzen.
        </p>
        <WVHButton to={{ name: 'BusinessLogin' }} primary class={Styles['request-new-password-success__button']}>
          Zurück zum Login
        </WVHButton>
        <p class={`${Styles['text--primary']} ${SharedStyles['text--small']}`}>
          Keine E-Mail erhalten? Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut oder kontaktieren Sie unseren
          Support unter{' '}
          <a
            href={`mailto:${this.email}`}
            target="_blank"
            title="E-Mail an WirVonHier senden"
            class={SharedStyles.link}
          >
            {this.email}
          </a>
        </p>
      </div>
    );
  }
}
