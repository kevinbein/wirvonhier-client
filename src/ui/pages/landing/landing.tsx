import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
//import { NavBar } from './../../components/navBar/navBar';

@Component
export class LandingPage extends Vue {
  // @ts-ignore: Declared variable is not read

  public location: Position | undefined;

  get zip(): string {
    //console.log('zip getter', window.localStorage.zip);
    return window.localStorage.zip;
  }

  set zip(newZip: string) {
    //console.log('zip setter:', this.zip, '->', newZip);
    window.localStorage.zip = newZip;
  }

  public updateZipKeyboard(event: KeyboardEvent): void {
    const curZip = window.localStorage.zip;
    //console.log('update zip keyboard', curZip, event.keyCode, curZip.length);
    // backspace
    if (event.keyCode == 8 && curZip.length > 0) {
      window.localStorage.zip = curZip.substr(0, curZip.length - 1);
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      window.localStorage.zip = curZip + '' + (event.keyCode - 48);
    } else if (event.keyCode == 13) {
      this.gotoExplorer();
    }
    //console.log('update zip keyboard done', window.localStorage.zip);
    //console.log('========');
  }

  public gotoExplorer(forceZip?: string): void {
    //console.log('goto explorer', window.localStorage.zip, window.localStorage.zip.length);
    const zip = window.localStorage.zip;
    if (forceZip !== undefined) {
      window.localStorage.zip = forceZip;
      this.$router.push('explore');
    } else if (zip.length == 5 && zip == '71665') {
      this.$router.push('explore');
    } else {
      //window.localStorage.zip = '71665';
      this.overlay = true;
    }
  }

  /*public clearLocalStorage(): void {
    window.localStorage.userLocation = '';
    window.localStorage.postCode = '';
  }*/

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

  public errorMessage = '';
  public openSnackbar = true;
  public overlay = false;
  public async locateMe(): Promise<void> {
    try {
      this.location = await this.getLocation();
      //this.clearLocalStorage();
      //console.log('got location', this.location);
      window.localStorage.location = JSON.stringify(
        '{ latitude: ' + this.location?.coords.latitude + ', longitude: ' + this.location?.coords.longitude + '}',
      );
      //console.log('set current location', window.localStorage.location);
      this.$router.push({ name: 'Explore' });
    } catch (e) {
      this.errorMessage = e.message;
      this.openSnackbar = true;
      //console.log(this.$refs.errorSnackbar);
      // Only secure origins are allowed (see: https://goo.gl/Y0ZkNV)
      //console.log('got error', e);
    }
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
          {/*<div onClick={this.locateMe.bind(this)} class={Styles['location-button']}>*/}
          <div class={Styles['location-button']}>
            <v-icon class={Styles['icon']}>fa-location-arrow</v-icon>
            <span class={Styles['text']}>AKTUELLER STANDORT</span>
          </div>
          <div class={Styles['other-text']}> oder </div>
          <v-text-field
            id="text-input"
            class={Styles['text-input']}
            type="number"
            label="POSTLEITZAHL EINGEBEN"
            value={this.zip}
            onChange={(value: string) => (this.zip = value)}
            onKeyup={(event: KeyboardEvent) => this.updateZipKeyboard(event)}
          ></v-text-field>
          <v-icon onClick={() => this.gotoExplorer()} class={Styles['search-icon']}>
            fa-search
          </v-icon>
        </div>

        <v-overlay class={Styles['overlay']} value={this.overlay} opacity={0.9}>
          <div class={Styles['close-button']}>
            <v-icon class={Styles['icon']} onClick={() => (this.overlay = false)}>
              fa-times
            </v-icon>
          </div>
          <div class={Styles['overlay-content']}>
            <div class={Styles['text1']}>Leider haben sich noch keine Läden in deiner Region eingetragen.</div>
            <div class={Styles['text2']}>
              Sieh dich stattdessen doch in einer bereits aktiven Region um:
              <br />
              <div on-click={() => this.gotoExplorer('71665')} class={Styles['link']}>
                71665 - Vaihingen/Enz
              </div>
              {/*<v-btn on-click={(this.overlay = false)}>71665 - Vaihingen/Enz</v-btn>*/}
            </div>
            <div class={Styles['text3']}>
              Du hast einen eigenen Laden? Toll! Lass uns doch
              <a class={Styles['link']} href="https://wirvonhier.net/anmeldung-fuer-einzelhaendler/">
                &nbsp;hier&nbsp;
              </a>
              unverbindlich deinen Kontakt da :)
            </div>
          </div>
        </v-overlay>

        {/* Not working, does not programmatically trigger ...
        <v-snackbar ref="errorSnackbar" value={this.openSnackbar}>
          {this.errorMessage}
          TEST TE STET ET ET ET
          <v-btn color="pink" text on-click={(this.openSnackbar = false)}>
            Close
          </v-btn>
        </v-snackbar>*/}
      </div>
    );
  }
}
