import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { FormInputField, OverlayView } from '@/ui/components';

@Component
export class LandingPage extends Vue {
  public location: Position | undefined;

  public gotoExplorer(forceZip?: string): void {
    const zip = window.localStorage.zip ? window.localStorage.zip : '';
    if (forceZip !== undefined) {
      window.localStorage.zip = forceZip;
      this.$router.push({ name: 'Explore', query: { zip } });
    } else if (zip.length == 5) {
      this.$router.push({ name: 'Explore', query: { zip } });
    } else {
      this.overlay = true;
    }
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

  public zip = '';
  public updateZip(data: { key: string; value: string }): void {
    window.localStorage.zip = data.value;
    this.zip = data.value;
    this.$forceUpdate();
  }

  public submitZip(): void {
    this.gotoExplorer();
  }

  public closeOverlay(): void {
    this.overlay = false;
  }

  created(): void {
    this.zip = window.localStorage.zip;
  }

  mounted(): void {
    document.body.style.background = 'rgb(232, 232, 232)';
    this.$root.$emit('iosChangeAppBarStyle', 'black-transcluent');
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        <div class={Styles['logo-container']}>
          <img class={Styles['logo']} src="./assets/imgs/wvh-pre-login_1500px.png" alt="Pre login logo" />
          <div class={Styles['welcome']}>
            <div class={Styles['welcome__title']}>Hi,</div>
            <div class={Styles['welcome__desc']}>
              schön dich zu sehen! Bevor wir loslegen, brauchen wir zunächst deinen Standort.
            </div>
          </div>
        </div>
        <div class={Styles['zip-container']}>
          <FormInputField
            label="POSTLEITZAHL EINGEBEN"
            id="title"
            type="text"
            attributes={{
              autofocus: true,
              autocomplete: 'postal-code',
            }}
            value={this.zip}
            on-change={this.updateZip.bind(this)}
            on-submit={this.submitZip.bind(this)}
            icon="fa fa-search"
            class={Styles['zip-container__field']}
          />
        </div>

        <div class={Styles['navigation']}>
          <div class={Styles['navigation__business']}>
            <router-link class={Styles['navigation__business-link']} to={{ name: 'BusinessDashboard' }}>
              Händlerlogin / Registrierung
            </router-link>
          </div>

          <div class={Styles['navigation__other']}>
            <router-link to="/datenschutz" class={Styles['navigation__other-link']}>
              Datenschutz
            </router-link>
            <router-link to="/nutzungsbedingungen" class={Styles['navigation__other-link']}>
              Nutzungsbedingungen
            </router-link>
            <router-link to="/impressum" class={Styles['navigation__other-link']}>
              Impressum
            </router-link>
          </div>
        </div>

        <OverlayView value={this.overlay} close-button={true} on-close={this.closeOverlay.bind(true)}>
          <div class={Styles['overlay-content']}>
            <div class={Styles['overlay-content__text1']}>
              Leider haben sich noch keine Läden in deiner Region eingetragen.
            </div>
            <div class={Styles['overlay-content__text2']}>
              Sieh dich stattdessen doch in einer bereits aktiven Region um:
              <br />
              <div
                on-click={() => this.gotoExplorer('71665')}
                class={`${Styles['overlay-content__link']} ${SharedStyles['link']}`}
              >
                71665 - Vaihingen/Enz
              </div>
            </div>
            <div class={Styles['overlay-content__text3']}>
              Du hast einen eigenen Laden? Toll! Lass uns doch{' '}
              <a
                class={`${Styles['overlay-content__link']} ${SharedStyles['link']}`}
                href="https://wirvonhier.net/anmeldung-fuer-einzelhaendler/"
              >
                hier
              </a>{' '}
              unverbindlich deinen Kontakt da :)
            </div>
          </div>
        </OverlayView>
      </div>
    );
  }
}

export default LandingPage;
