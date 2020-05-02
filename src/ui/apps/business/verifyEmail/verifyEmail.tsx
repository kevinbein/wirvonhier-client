import Component from 'vue-class-component';
import Styles from './verifyEmail.scss';
import SharedStyles from '@/ui/styles/main.scss';
import Vue from 'vue';
import { AppearanceModule, rootModule } from '@/store';
import { WVHButton, Loader } from '@/ui/components';

@Component({
  name: 'VerifyEmail',
})
export class VerifyEmailPage extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);
  public rootModule = rootModule.context(this.$store);
  public status: 'waiting' | 'verified' | 'failed' = 'waiting';

  public get email(): string {
    return this.rootModule.state.emails.support;
  }
  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  public async beforeMount(): Promise<void> {
    const token = this.$route.query.token;
    if (typeof token !== 'string' || !token) {
      this.status = 'failed';
      return;
    }
    const res = await this.rootModule.actions.verifyUserEmail(token);
    if (res.status === 'failure') {
      this.status = 'failed';
    }
    if (res.status === 'success') {
      this.status = 'verified';
    }
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['verify-email__page']}`}>
        {this.status === 'verified' && (
          <div class={Styles['verify-email__title']}>E-Mail Adresse erfolgreich verifiziert!</div>
        )}
        {this.status === 'waiting' && <Loader />}
        {this.status === 'failed' && (
          <div class={Styles['verify-email__title']}>
            Fehlgeschlagen: E-Mail Adresse konnte nicht verifiziert werden!
            <br />
            Bitte kontaktiere unsere Support unter:{' '}
            <a href={`mailto:${this.email}`} title="E-Mail an WirVonHier senden" target="_blank">
              {this.email}
            </a>
            .
          </div>
        )}
        <WVHButton to={{ name: 'BusinessDashboard' }} primary>
          weiter zum Dashboard
        </WVHButton>
      </div>
    );
  }
}

export default VerifyEmailPage;
