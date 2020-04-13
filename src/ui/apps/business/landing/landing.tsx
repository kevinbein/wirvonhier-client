import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
import { rootModule } from '@/store';

@Component({
  name: 'BusinessLanding',
})
export class BusinessLandingPage extends Vue {
  public rootStore = rootModule.context(this.$store);

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        <div class={Styles['logo-container']}>
          <img class={Styles['logo']} src="./assets/imgs/wvh-pre-login_1500px.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['title']}>Hi,</div>
            <div class={Styles['desc']}>
              {/*schön Sie zu sehen! Bitte treten Sie Ihrem Profil bei oder registrieren Sie sich hier!*/}
              schön Sie zu sehen! Haben Sie schon einen Account bei uns?
            </div>
          </div>
        </div>
        <form>
          <div class={Styles['buttons']}>
            <div class={Styles['button-container']}>
              <router-link to={{ name: 'BusinessLogin', query: { strategy: 'local' } }} class={Styles.button}>
                Zum Login
              </router-link>
            </div>
            <div class={Styles['button-container']}>
              <div class={Styles['desc']}>Oder</div>
            </div>
            <div class={Styles['button-container']}>
              <router-link to={{ name: 'BusinessRegister', query: { strategy: 'local' } }} class={Styles.button}>
                Jetzt registrieren
              </router-link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BusinessLandingPage;
