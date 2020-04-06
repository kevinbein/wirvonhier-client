import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
//import { NavBar } from './../../components/navBar/navBar';

@Component
export class LandingPage extends Vue {
  // @ts-ignore: Declared variable is not read

  public gettingLocation = false;
  public location: Position | undefined;
  private postCode = 'no';
  public errorStr = '';

  // mounted(): void {
  //   this.getPostcode();
  // }

  public getPostcode(): string {
    if (window.localStorage.postCode) {
      this.postCode = window.localStorage.postCode;
    }
    return this.postCode;
  }

  public savePostCode(): void {
    window.localStorage.postCode = this.postCode;
    this.$router.push('Explore');
  }

  public async getLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation is not available.'));
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos);
        },
        (err) => {
          reject(err);
        },
      );
    });
  }

  public async locateMe(): Promise<void> {
    this.gettingLocation = true;

    try {
      this.gettingLocation = false;
      this.location = await this.getLocation();
    } catch (e) {
      this.gettingLocation = false;
      this.errorStr = e.message;
    }

    window.localStorage.userLocation = JSON.stringify(
      '{ latitude: ' + this.location?.coords.latitude + ', longitude: ' + this.location?.coords.longitude + '}',
    );
    this.$router.push({ name: 'Explore' });
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
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
          <div onClick={this.locateMe.bind(this)} class={Styles['button'] + ' ' + Styles['location']}>
            <v-icon class={Styles['icon']}>fa-location-arrow</v-icon> AKTUELLER STANDORT
          </div>
          <div class={Styles['other-text']}> oder </div>
          <v-text-field
            class={Styles['text-input']}
            color="#5f6daf"
            label="POSTLEITZAHL EINGEBEN"
            change={(postcode: { target: { value: string } }) => (this.postCode = postcode.target.value)}
          ></v-text-field>
          <button onClick={this.savePostCode.bind(this)} class={Styles['search-button']}>
            <v-icon class={Styles['search-icon']} size="30px">
              fa-search
            </v-icon>
          </button>
        </div>
      </div>
    );
  }
}
