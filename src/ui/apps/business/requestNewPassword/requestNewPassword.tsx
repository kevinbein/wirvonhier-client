import Component from 'vue-class-component';
import Styles from './requestNewPassword.scss';
import Vue from 'vue';
import { RequestNewPasswordForm } from './RequestNewPasswordForm';
import { rootModule, AppearanceModule } from '@/store';

@Component({
  name: 'RequestNewPassword',
})
export class RequestNewPasswordPage extends Vue {
  public rootModule = rootModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public get email(): string {
    return this.rootModule.state.emails.support;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['request-new-password__page']}`}>
        <router-link to={{ name: 'BusinessLogin' }} title="zurück" class={Styles['request-new-password__back']}>
          zurück
        </router-link>
        <div class={Styles['request-new-password__title']}>Neues Password anfordern</div>
        <p class={`${Styles['text--primary']} ${Styles.amplifier}`}>
          Sie erhalten im nächsten Schritt eine E-Mail mit weiteren Instruktionen von uns.
        </p>
        <RequestNewPasswordForm />
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

export default RequestNewPasswordPage;