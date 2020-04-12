import Component from 'vue-class-component';
import { CreateElement } from 'vue/types/umd';
import Styles from './profile.scss';
import '../../../plugins/leaflet';
//import { LatLng } from 'leaflet';
import L from 'leaflet';
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'vue2-leaflet';
import { VueComponent } from '@/ui/vue-ts-component';

const dummyCover = '/assets/imgs/dummy_cover_1500x844.png';
@Component({
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
})
export class ProfilePage extends VueComponent<{ profile: any }> {
  profile!: any;

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
  public businessId: string | null = null;
  public existCover = false;

  constructor() {
    super();
    // eslint-disable-next-line no-console
    console.log(this);
    this.existCover = !!this.profile.media.cover && !!this.profile.media.cover.image;
  }
  handleClick(): void {
    //console.log('TEST');
  }

  goToExplorer(): void {
    this.$emit('go-to-explorer');
  }

  disableMap(): void {
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
    //document.getElementsByClassName('leaflet-control-zoom')[0].style.visibility = 'hidden';
  }

  loadedMap(): void {
    this.disableMap();
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    //const businessId = this.$route.params.businessId;
    //const db = this.$store.$db.businesses;
    //console.log(businessId, db.find({}));
    let mapCenter = [47.78099, 9.61529];
    const geolocation = mapCenter;
    if (
      this.profile !== null &&
      this.profile.geolocation &&
      this.profile.geolocation.lat &&
      this.profile.geolocation.lng
    ) {
      mapCenter = [this.profile.geolocation.lat, this.profile.geolocation.lng];
    }

    return (
      (this.profile === null && (
        <div class={Styles['loading-error-container']}>
          <div onClick={this.goToExplorer.bind(this)} class={Styles['loading-error-container__close']}>
            <v-icon class={Styles['icon']}>fa-times</v-icon>
          </div>
          <div class={Styles['loading-error']}>
            <div class={Styles['message']}>
              Loading profile &nbsp;
              <v-icon class={Styles['icon']}>fas fa-spinner fa-spin</v-icon>
            </div>
          </div>
        </div>
      )) || (
        <div class={Styles['profile-page']}>
          <div class={Styles['profile-page__close--wrapper']}>
            <div onClick={this.goToExplorer.bind(this)} ref="closeProfileButton" class={Styles['profile-page__close']}>
              <v-icon class={Styles['icon']}>fa-times</v-icon>
            </div>
          </div>
          <router-link to="/map" class={Styles['location-container']}>
            <div class={Styles['location']}>
              <l-map
                on-ready={() => this.loadedMap()}
                ref="locationMap"
                style="height: 100%; width: 100%"
                zoom={this.zoom}
                center={mapCenter}
              >
                <l-tile-layer url={this.url}></l-tile-layer>
                <l-marker lat-lng={geolocation} icon={this.icon}></l-marker>
              </l-map>
            </div>
            <div class={Styles['bar']}>
              <div class={Styles['arrow-container']}>
                <div class={Styles['arrow']}></div>
              </div>
            </div>
          </router-link>

          <div class={Styles['profile-page_container']}>
            <h1 class={Styles['profile-page__title']}>{this.profile.name}</h1>
            <div class={Styles['profile-image-container']}>
              {(this.existCover && (
                <cld-image
                  class={Styles['profile-image']}
                  publicId={this.profile.media.cover.image.publicId}
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
                  <div class={Styles['description']}>{this.profile.description}</div>
                </div>
                <div class={Styles['row']}>
                  <div class={Styles['left-side']}>
                    <div class={Styles['title']}>Kontakt</div>
                    <div class={Styles['description']}>
                      <a href={'tel:' + this.profile.phone}>{this.profile.phone}</a>
                      <br />
                      <a href={'mailto:' + this.profile.email}>{this.profile.email}</a>
                      <br />
                      <a href={this.profile.homepage}>{this.profile.homepage}</a>
                    </div>
                  </div>
                  <div class={Styles['right-side']}>
                    <div class={Styles['title']}>Adresse</div>
                    <div class={Styles['description']}>
                      {this.profile.address.street} {this.profile.address.streetNumber}
                      <br />
                      {this.profile.address.zip} {this.profile.address.city}
                    </div>
                  </div>
                </div>
                <div class={Styles['row']}>
                  <div class={Styles['title'] + ' ' + Styles['updated']}>
                    {/*Aktualisiert am {this.profile.updated.toLocaleDateString()}*/}
                  </div>
                </div>
              </div>
            </div>

            <div class={Styles['feature-info']}>
              {this.profile.delivery.length > 0 && (
                <div class={Styles['feature-container']}>
                  <div class={Styles['feature']}>
                    <div class={Styles['icon']}>
                      <img class={Styles['image']} src="/assets/imgs/profile_delivery_128x128.png" />
                    </div>
                    <div class={Styles['title']}>
                      Kontaktlose
                      <br />
                      Lieferung
                    </div>
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
              {this.profile.paymentMethods.length > 0 && (
                <div class={Styles['feature-container']}>
                  <div class={Styles['feature']}>
                    <div class={Styles['icon']}>
                      <img class={Styles['image']} src="/assets/imgs/profile_payment_128x128.png" />
                    </div>
                    <div class={Styles['title']}>Einfache Bezahlung</div>
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
                {this.profile.phone && (
                  <a class={Styles['button'] + ' ' + Styles['brand']} href={'tel:' + this.profile.phone}>
                    <v-icon class={Styles['icon']}>fa-phone</v-icon>
                  </a>
                )}
                {this.profile.facebook && (
                  <a
                    class={Styles['button'] + ' ' + Styles['brand']}
                    href={'https://www.facebook.com/' + this.profile.facebook.trim()}
                  >
                    <v-icon class={Styles['icon']}>fab fa-facebook-f</v-icon>
                  </a>
                )}
                {this.profile.instagram && (
                  <a
                    class={Styles['button'] + ' ' + Styles['brand']}
                    href={'https://www.instagram.com/' + this.profile.instagram.trim()}
                  >
                    <v-icon class={Styles['icon']}>fab fa-instagram</v-icon>
                  </a>
                )}
                {this.profile.whatsapp && (
                  <a
                    class={Styles['button'] + ' ' + Styles['brand']}
                    href={'https://api.whatsapp.com/send?phone=' + this.profile.phone.trim().replace(/\s/g, '')}
                  >
                    <v-icon class={Styles['icon']}>fab fa-whatsapp</v-icon>
                  </a>
                )}
              </div>
            </div>

            <div class={Styles['stories']}>
              <div class={Styles['headline']}>Alle Stories</div>
              <div class={Styles.stories__container}>
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
                        <div class={Styles['date']}>{new Date(img.modified).toLocaleDateString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
