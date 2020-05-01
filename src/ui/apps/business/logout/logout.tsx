import Component from 'vue-class-component';
import Styles from './logout.scss';
import Vue from 'vue';
import { WVHButton } from '@/ui';
import { rootModule } from '@/store';

@Component({
  name: 'BusinessLogout',
})
export class BusinessLogoutPage extends Vue {
  public rootModule = rootModule.context(this.$store);

  created(): void {
    this.rootModule.actions.logout();
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['logout__page']}`}>
        <img class={Styles['logout__logo']} src="/assets/imgs/logo/logo-schrift_512x203.png" alt="WirVonHier Logo" />
        <div class={Styles['logout__title']}>Bis zum nächsten mal!</div>

        <WVHButton class={Styles['logout__button']} to={{ name: 'BusinessLogin' }}>
          LOGIN
        </WVHButton>
        <WVHButton class={Styles['logout__button']} to={{ name: 'BusinessRegister' }}>
          REGISTRIEREN
        </WVHButton>
      </div>
    );
  }
}

export default BusinessLogoutPage;
