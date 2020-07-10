import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';
import { FormInputField, WVHButton } from '@/ui/components';
import { LocationModule, BusinessModule } from '@/store/modules';
import { POSITION, TYPE } from 'vue-toastification';

@Component({
  name: 'Landing',
})
export class Landing extends Vue {
  public locationModule = LocationModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);

  public get location(): [number, number] | null {
    return this.locationModule.state.currentLocation;
  }

  public get zip(): string {
    return `${this.locationModule.state.currentZip || ''}`;
  }
  public get locationString(): string {
    return this.location ? `${this.location[0]},${this.location[1]}` : '';
  }

  created(): void {
    this.locationModule.actions.initGoogleMaps();
  }

  public async useLocation(): Promise<void> {
    const { status, position } = await this.locationModule.actions.requestUserLocation();
    if (status !== 'success') return;
    this.locationModule.actions.setCurrentLocation(position);
    await this.businessModule.actions.setFilter({
      name: 'location',
      value: {
        lng: position[0],
        lat: position[1],
        maxDistance: 10000,
      },
    });
    this.$router.push({ name: 'Explore', query: { location: this.locationString } });
  }

  public updateZip(data: { key: string; value: string }): void {
    this.locationModule.actions.setCurrentZIP(data.value);
  }

  public async submitZip(): Promise<void> {
    if (this.zip.length < 5) {
      this.$toast('Bitte gib eine gültige PLZ ein.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.WARNING,
      });
      return;
    }
    const location = await this.locationModule.actions.setCurrentLocation({ zip: this.zip ? Number(this.zip) : null });
    if (!location) {
      this.$toast('Mist! Wir konnten den Standort nicht bestimmen. Bitte versuche es nochmal.', {
        position: POSITION.TOP_CENTER,
        type: TYPE.WARNING,
      });
      return;
    }
    await this.businessModule.actions.setFilter({
      name: 'location',
      value: {
        lng: location[0],
        lat: location[1],
        maxDistance: 10000,
      },
    });
    this.$router.push({ name: 'Explore', query: { location: this.locationString } });
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['landing']}>
        <div class={Styles['landing__background']} />
        <div class={Styles['landing__title']}>
          <span class={Styles['landing__title--larger']}>Hi,</span>
          <span>schön dich zu sehen! Bevor wir loslegen, brauchen wir zunächst deinen Standort.</span>
        </div>

        <div class={Styles['landing__actions']}>
          <WVHButton primary on-click={this.useLocation.bind(this)}>
            Meinen Standort nutzen
          </WVHButton>
          <div class={Styles['landing__actions-separator']}>oder</div>
          <div class={Styles['zip-container']}>
            <FormInputField
              label="POSTLEITZAHL EINGEBEN"
              id="zip"
              type="number"
              attributes={{
                autofocus: true,
                autocomplete: 'postal-code',
              }}
              value={this.zip}
              on-change={this.updateZip.bind(this)}
              on-submit={this.submitZip.bind(this)}
              icon="fa fa-search"
            />
          </div>
        </div>

        <div class={Styles['navigation']}>
          <router-link class={Styles['navigation__business-link']} to={{ name: 'BusinessDashboard' }}>
            Händlerlogin / Registrierung
          </router-link>

          <div class={Styles['navigation__legal-links']}>
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
      </div>
    );
  }
}
