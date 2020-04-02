import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
//import { NavBar } from './../../components/navBar/navBar';

@Component({
  name: 'Landing',

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        {/*<NavBar></NavBar>*/}

        <div class={Styles['logo-container']}>
          {/*<img class={Styles['logo']} src="./assets/imgs/Herz_Logo_negativ.png" />*/}
          <img class={Styles['logo']} src="./assets/imgs/wvh-pre-login.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['title']}>Hi,</div>
            <div class={Styles['desc']}>
              schön dich zu sehen! Bevor wir loslegen, brauchen wir zunächst deinen Standort.
            </div>
          </div>
        </div>

        <div class={Styles['button-container']}>
          {/*<p class={Styles['caption']}>DIREKT ZU DIR</p>*/}
          <div class={Styles['button'] + ' ' + Styles['location']}>
            <router-link to="explore">
              <v-icon class={Styles['icon']}>fa-location-arrow</v-icon> AKTUELLER STANDORT
            </router-link>
          </div>
          <div class={Styles['other-text']}> oder </div>
          <div class={Styles['button']}>
            <router-link to={'../../citycode'}>POSTLEITZAHL EINGEBEN</router-link>
          </div>
        </div>
      </div>
    );
  },
})
export class LandingPage extends Vue {}
