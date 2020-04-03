import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
//import { NavBar } from './../../components/navBar/navBar';

@Component({
  name: 'Landing',
})
export class LandingPage extends Vue {
  // @ts-ignore: Declared variable is not read

  public gettingLocation: boolean = false;
  public location: any = null;
  public errorStr: String = "";

  public async getLocation() {
    return new Promise((resolve, reject) => {
      if(!("geolocation" in navigator)) {
        reject(new Error('Geolocation is not available.'));
      }

      navigator.geolocation.getCurrentPosition(pos => {
        resolve(pos);
      }, err => {
        reject(err);
      });

    });
  }

  public async locateMe() {
    this.gettingLocation = true;

    try {
      this.gettingLocation = false;
      this.location = await this.getLocation();
    }
    catch (e) {
      this.gettingLocation = false;
      this.errorStr = e.message;
    }

    // TODO: Save Location Data to Cookie/Local Storage
    console.log(this.location.coords.latitude + ' ' + this.location.coords.longitude);
    this.$router.push({name: 'Explore'});
  }

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
          <div class={Styles['button'] + ' ' + Styles['location']} on-click={this.locateMe}>
            <v-icon class={Styles['icon']}>fa-location-arrow</v-icon> AKTUELLER STANDORT
          </div>
          <div class={Styles['other-text']}> oder </div>
          <div class={Styles['button']}>
            <router-link to="explore">POSTLEITZAHL EINGEBEN</router-link>
          </div>
        </div>
      </div>
    );
  }
}