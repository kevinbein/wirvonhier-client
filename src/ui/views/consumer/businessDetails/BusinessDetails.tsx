import Component from 'vue-class-component';
import { CreateElement } from 'vue/types/umd';
import Styles from './businessDetails.scss';
import '../../../plugins/leaflet';
import L from 'leaflet';
import 'vue2-leaflet';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { Business } from '@/entities';
import { BusinessModule } from '@/store/modules';
import { Loader } from '@/ui';

const dummyCover = '/assets/imgs/dummy_cover_1500x844.png';
@Component({
  name: 'BusinessDetails',
})
export class BusinessDetails extends VueComponent<{}> {
  private businessModule = BusinessModule.context(this.$store);
  zoom = 17;
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  icon = L.icon({
    iconUrl: '/assets/imgs/logo/logo_192x192.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public profileWidth = this.deviceWidth >= 500 ? 500 - 32 : this.deviceWidth;
  public profileHeight = Math.round((this.profileWidth / 16) * 9);
  public storyWidth = this.deviceWidth >= 500 ? 230 : Math.round(this.deviceWidth / 2 - 20);

  public businessName: string | null = null;

  public get whatsAppApiNumber(): string {
    // remove non numeric characters
    let number = this.profile?.whatsApp.trim().replace(/\s/g, '');
    // add german phone code when this part is missing (needed by the api)
    if (number?.startsWith('0')) {
      number = '49' + number.substr(1);
    }
    return number || '';
  }
  public get businessId(): string {
    return this.$route.params.businessId;
  }
  public get profile(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  public get profileId(): string | undefined {
    return this.profile?.media.profile.publicId;
  }

  public goToExplorer(): void {
    this.$emit('close');
  }

  public disableMap(): void {
    if (this.$refs.locationMap === undefined) {
      return;
    }
    // @ts-ignore: mapObject is definitely defined if locationMap is defined ...
    const map = this.$refs.locationMap.mapObject;
    map.zoomControl.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) {
      map.tap.disable();
    }
  }

  loadedMap(): void {
    this.disableMap();
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    let mapCenter = [47.78099, 9.61529];
    if (this.profile && this.profile.location) {
      mapCenter = [this.profile.location.geo.coordinates[1], this.profile.location.geo.coordinates[0]];
    }

    return this.profile === null ? (
      <Loader />
    ) : (
      <div class={Styles['profile-page']}>
        <div class={Styles['profile-page__close--wrapper']}>
          <div onClick={this.goToExplorer.bind(this)} ref="closeProfileButton" class={Styles['profile-page__close']}>
            <i class="fa fa-times" />
          </div>
        </div>
        <router-link
          to={{ name: 'Map', query: { lat: mapCenter[0], lng: mapCenter[1] } }}
          class={Styles['location-container']}
        >
          <div class={Styles['location']}>
            <l-map
              on-ready={() => this.loadedMap()}
              ref="locationMap"
              style="height: 100%; width: 100%"
              zoom={this.zoom}
              center={mapCenter}
            >
              <l-tile-layer url={this.url}></l-tile-layer>
              <l-marker lat-lng={mapCenter} icon={this.icon}></l-marker>
            </l-map>
          </div>
          <div class={Styles['bar']}>
            <div class={Styles['arrow-container']}>
              <div class={Styles['arrow']}></div>
            </div>
          </div>
        </router-link>

        <div class={Styles['profile-page_container']}>
          <h1 class={Styles['profile-page__title']}>{this.profile?.name}</h1>
          <div class={Styles['profile-image-container']}>
            {(this.profileId && (
              <cld-image
                class={Styles['profile-image']}
                publicId={this.profileId}
                height="180"
                width={this.profileWidth}
                crop="fill"
                gravity="faces"
                dpr={window.devicePixelRatio}
              />
            )) || <img class={Styles['profile-image']} src={dummyCover} />}
          </div>

          <div class={Styles['details-container']}>
            <div class={Styles['details']}>
              <div class={Styles['row']}>
                <div class={Styles['title']}>Angebot</div>
                <div class={Styles['description']}>{this.profile?.description}</div>
              </div>
              <div class={Styles['row']}>
                <div class={Styles['left-side']}>
                  <div class={Styles['title']}>Kontakt</div>
                  <div class={Styles['description']}>
                    <a href={'tel:' + this.profile?.phone}>{this.profile?.phone}</a>
                    <br />
                    <a href={'mailto:' + this.profile?.email}>{this.profile?.email}</a>
                    <br />
                    <a href={this.profile?.website}>{this.profile?.website}</a>
                  </div>
                </div>
                <div class={Styles['right-side']}>
                  <div class={Styles['title']}>Adresse</div>
                  {this.profile?.address ? (
                    <div class={Styles['description']}>
                      <span>
                        {this.profile.address.street} {this.profile.address.streetNumber}
                      </span>
                      <br />
                      <span>
                        {this.profile.address.zip} {this.profile.address.city}
                      </span>
                    </div>
                  ) : (
                    <span>Keine Adresse verfügbar</span>
                  )}
                </div>
              </div>
              <div class={Styles['row']}>
                <div class={Styles['title'] + ' ' + Styles['updated']}></div>
              </div>
            </div>
          </div>

          <div class={Styles['feature-info']}>
            {this.profile && this.profile.delivery.length > 0 && (
              <div class={Styles['feature-container']}>
                <div class={Styles['feature']}>
                  <div class={Styles['icon']}>
                    <img class={Styles['image']} src="/assets/imgs/profile_delivery_128x128.png" />
                  </div>
                  <div class={Styles['title']}>Lieferung</div>
                  <div class={Styles['description']}>
                    {this.profile.delivery
                      .map((delivery: string) => {
                        switch (delivery) {
                          case 'collect': {
                            return 'Abholung im Geschäft';
                          }
                          case 'deliveryByOwner': {
                            return 'Lieferung per Kurier';
                          }
                          case 'deliveryByService': {
                            return 'Lieferung per Service';
                          }
                        }
                      })
                      .join(', ')}
                  </div>
                </div>
              </div>
            )}
            {this.profile && this.profile.paymentMethods.length > 0 && (
              <div class={Styles['feature-container']}>
                <div class={Styles['feature']}>
                  <div class={Styles['icon']}>
                    <img class={Styles['image']} src="/assets/imgs/profile_payment_128x128.png" />
                  </div>
                  <div class={Styles['title']}>Bezahlung</div>
                  <div class={Styles['description']}></div>
                  <div class={Styles['description']}>
                    {this.profile.paymentMethods
                      .map((delivery: string) => {
                        // Paypal, Klarna, auf Rechnung
                        switch (delivery) {
                          case 'invoice': {
                            return 'Rechnung';
                          }
                          case 'paypal': {
                            return 'PayPal';
                          }
                          case 'creditcard': {
                            return 'Kreditkarte';
                          }
                          case 'cash': {
                            return 'Bar';
                          }
                          case 'sofort': {
                            return 'SOFORT';
                          }
                        }
                      })
                      .join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div class={Styles['button-row-container']}>
            <div class={Styles['button-row']}>
              {this.profile?.phone && (
                <a class={Styles['button'] + ' ' + Styles['brand']} href={'tel:' + this.profile.phone}>
                  <i class={`${Styles['icon']} fa fa-phone`}></i>
                </a>
              )}
              {this.profile?.facebook && (
                <a
                  class={Styles['button'] + ' ' + Styles['brand']}
                  href={'https://www.facebook.com/' + this.profile.facebook.trim()}
                >
                  <i class={`${Styles['icon']} fab fa-facebook-f`}></i>
                </a>
              )}
              {this.profile?.instagram && (
                <a
                  class={Styles['button'] + ' ' + Styles['brand']}
                  href={'https://www.instagram.com/' + this.profile.instagram.trim()}
                >
                  <i class={`${Styles['icon']} fab fa-instagram`}></i>
                </a>
              )}
              {this.profile?.whatsApp && (
                <a class={Styles['button'] + ' ' + Styles['brand']} href={'https://wa.me/' + this.whatsAppApiNumber}>
                  <i class={`${Styles['icon']} fab fa-whatsapp`}></i>
                </a>
              )}
            </div>
          </div>

          {this.profile && this.profile.media.stories.images.length > 0 && (
            <div class={Styles['stories']}>
              <div class={Styles['headline']}>Alle Stories</div>
              <div class={Styles['stories__container']}>
                {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.profile.media.stories.images.map((img: any) => {
                  return (
                    <div class={Styles['story-container']}>
                      <div class={Styles['story']}>
                        <cld-image
                          class={Styles['story-image']}
                          publicId={img.publicId}
                          width={this.storyWidth}
                          crop="scale"
                          dpr={window.devicePixelRatio}
                          fetchFormat="auto"
                        >
                          <cld-transformation width={this.storyWidth} crop="scale" />
                        </cld-image>
                        <div class={Styles['description']}>{img.title}</div>
                        <div class={Styles['date']}>{new Date(img.modifiedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
