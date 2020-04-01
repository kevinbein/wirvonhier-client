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
          <img class={Styles['logo']} src="./assets/imgs/Herz_Logo_negativ.png" />
        </div>

        <div class={Styles['button-container']}>
          {/*<p class={Styles['caption']}>DIREKT ZU DIR</p>*/}
          <div class={Styles['button']}>
            <router-link to="explore">STANDORT FREIGEBEN</router-link>
          </div>
          <div class={Styles['other-text']}> oder </div>
          <div class={Styles['button']}>
            <router-link to="citycode">POSTLEITZAHL EINGEBEN</router-link>
          </div>
        </div>
      </div>
    );
  },
})
export class LandingPage extends Vue {}
