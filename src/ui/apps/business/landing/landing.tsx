import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
import { rootModule, UserModule, AppearanceModule } from '@/store';
import { WVHButton } from '@/ui';

@Component({
  name: 'BusinessLanding',
})
export class BusinessLandingPage extends Vue {
  public rootStore = rootModule.context(this.$store);
  public userModule = UserModule.context(this.$store);
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['landing__page']}`}>
        <div class={Styles['landing__title']}>Hi,</div>
        <div class={Styles['landing__subtitle']}>schön Sie zu sehen! Haben Sie schon einen Account bei uns?</div>
        <div class={Styles['landing__buttons']}>
          <WVHButton to={{ name: 'BusinessLogin' }} class={Styles['landing__button']}>
            Zum Login
          </WVHButton>
          <div class={Styles['landing__text']}>oder</div>
          <WVHButton to={{ name: 'BusinessRegister' }} class={Styles['landing__button']}>
            Jetzt registrieren
          </WVHButton>
        </div>
        <router-link to={{ name: 'Landing' }} class={Styles['landing__to-user-frontend']}>
          Zur Nutzer-Ansicht
        </router-link>
      </div>
    );
  }
}

export default BusinessLandingPage;
