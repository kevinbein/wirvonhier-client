import Vue from 'vue';
import Component from 'vue-class-component';
import { CreateElement } from 'vue/types/umd';
import Styles from './profile.scss';
import '../../plugins/leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'vue2-leaflet';

type profile = {
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  homepage: string;
  twitter: string;
  facebook: string;
  instagram: string;
  description: string;
  locationPicture: string;
  geolocation: LatLng;
  coverPicture: string;
  updated: Date;
  stories: Array<{ description: string; date: Date; picture: string; picturebig: string }>;
};

@Component
export class ProfilePage extends Vue {
  zoom = 18;
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  icon = L.icon({
    iconUrl: './assets/imgs/logo.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  get profile(): profile {
    return {
      name: 'Prüssing & Köll',
      street: 'Heinrichstraße 5',
      zip: '01097',
      city: 'Dresden',
      phone: '0351/8104646',
      email: 'info@pk-dresden.de',
      homepage: 'pruessingundkoell.de',
      twitter: '',
      facebook: '',
      instagram: '@pruessingundkoell',
      description:
        'Wir von Prüssing & Köll stehen als Familienunternehmen ein für unsere Kompetenz in Klassik und Manufaktur-handwerk. Als der Dresdner Herrenausstatter bieten wir Ihnen das kom-plette Spektrum für den Gentleman.',
      coverPicture: '/assets/stories/pruessingkoell/cover.png',
      locationPicture: '/assets/stories/pruessingkoell/location.png',
      geolocation: new LatLng(47.78099, 9.61529),
      updated: new Date(),
      stories: [
        {
          description: 'Outfit des Tages',
          date: new Date('2020-04-05'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell1.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell1_big.png',
        },
        {
          description: 'Ostergeschenke',
          date: new Date('2020-04-01'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell8.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell8_big.png',
        },
        {
          description: 'Businesshemd',
          date: new Date('2020-03-31'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell4.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell4_big.png',
        },
        {
          description: 'Herrenschuh',
          date: new Date('2020-03-29'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell6.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell6_big.png',
        },
        {
          description: 'WirVonHier',
          date: new Date('2020-03-28'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell5.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell5_big.png',
        },
        {
          description: 'Wir nehmen Maß',
          date: new Date('2020-03-26'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell3.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell3_big.png',
        },
        {
          description: 'Manschettenknöpfe',
          date: new Date('2020-03-25'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell2.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell2_big.png',
        },
        {
          description: 'Kniestrümpfe',
          date: new Date('2020-03-24'),
          picture: '/assets/stories/pruessingkoell/pruessingkoell7.png',
          picturebig: '/assets/stories/pruessingkoell/pruessingkoell7_big.png',
        },
      ],
    };
  }

  handleClick(): void {
    //console.log('TEST');
  }

  mounted(): void {
    //let el = this.$refs['feature-delivery'];
    this.$nextTick(() => {
      //this.$refs.locationMap.mapObject.dragging.disable();
      // @ts-ignore: mapObject is definitely defined ...
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
    });
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    //const businessId = this.$route.params.businessId;
    //const db = this.$store.$db.businesses;
    //console.log(businessId, db.find({}));

    const mapCenter = [this.profile.geolocation.lat, this.profile.geolocation.lng]; // + 0.0005];
    return (
      <div class={Styles['profile-page']}>
        <router-link to="map" class={Styles['location-container']}>
          <div class={Styles['location']}>
            {/*<img class={Styles['picture']} src={this.profile.locationPicture} />*/}
            {/*<div
              class={Styles['picture']}
              style={'background-image: url("' + this.profile.locationPicture + '")'}
            ></div>*/}
            <l-map ref="locationMap" style="height: 100%; width: 100%" zoom={this.zoom} center={mapCenter}>
              <l-tile-layer url={this.url}></l-tile-layer>
              <l-marker lat-lng={this.profile.geolocation} icon={this.icon}></l-marker>
            </l-map>
          </div>
          <div class={Styles['bar']}>
            <div class={Styles['arrow-container']}>
              <div class={Styles['arrow']}></div>
            </div>
          </div>
        </router-link>

        <div class={Styles['shop-title']}>{this.profile.name}</div>

        {/*<div class={Styles['feature-info']}>
          <div class={Styles['arrow-container']}>
            <div class={Styles['arrow-border']}></div>
            <div class={Styles['arrow']}></div>
          </div>
          <div class={Styles['content-wrapper']}>
            <div class={Styles['content-container']}>
              <div class={Styles['content']}>
                <div class={Styles['left-side']}>
                  <img class={Styles['image']} src="/assets/imgs/Delivery.png" />
                </div>
                <div class={Styles['right-side']}>
                  <div class={Styles['title']}>KONTAKTLOSE LIEFERUNG</div>
                  <div class={Styles['desc']}>
                    <div class={Styles['when']}>noch heute möglich</div>
                    <div class={Styles['how']}>per Taxikurier gegen 14:00 Uhr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>*/}

        {/*<div class={Styles['information-bar']}>
          <div class={Styles['features']}>
            <div ref="feature-delivery" class={Styles.feature} onClick={this.handleClick}>
              Lieferung
            </div>
            <div class={Styles.feature}>Bezahlung</div>
          </div>
          <div class={Styles['contacts']}>
            <div
              class={Styles['contact']}
              onclick={'window.open("https://twitter.com/' + this.profile.twitter.replace('@', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-twitter</v-icon>
            </div>
            <div
              class={Styles['contact']}
              onclick={'window.open("https://facebook.com/' + this.profile.facebook.replace('@', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-facebook</v-icon>
            </div>
            <div
              class={Styles['contact']}
              onclick={'window.open("https://instagram.com/' + this.profile.instagram.replace('@', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-instagram</v-icon>
            </div>
          </div>
        </div>*/}

        <div class={Styles['profile-image-container']}>
          <img class={Styles['profile-image']} src={this.profile.coverPicture} />
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
                  {this.profile.phone}
                  <br />
                  {this.profile.email}
                  <br />
                  {this.profile.homepage}
                </div>
              </div>
              <div class={Styles['right-side']}>
                <div class={Styles['title']}>Adresse</div>
                <div class={Styles['description']}>
                  {this.profile.street}
                  <br />
                  {this.profile.city}
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
          <div class={Styles['feature-container']}>
            <div class={Styles['feature']}>
              <div class={Styles['icon']}>
                <img class={Styles['image']} src="/assets/imgs/Delivery.png" />
              </div>
              <div class={Styles['title']}>
                Dein Lieblings-
                <br />
                einzelhändler
              </div>
              <div class={Styles['description']}>
                Öffnungszeiten:
                <br />
                Mo.-Fr.: 10:00-19:00 Uhr
                <br />
                Sa.: 10:00-16:00 Uhr
              </div>
            </div>
          </div>
          <div class={Styles['feature-container']}>
            <div class={Styles['feature']}>
              <div class={Styles['icon']}>
                <img class={Styles['image']} src="/assets/imgs/Payment.png" />
              </div>
              <div class={Styles['title']}>
                Kontaktlose
                <br />
                Lieferung
              </div>
              <div class={Styles['description']}>Abholung im Geschäft, Lieferung per Kurier</div>
            </div>
          </div>
          <div class={Styles['feature-container']}>
            <div class={Styles['feature']}>
              <div class={Styles['icon']}>
                <img class={Styles['image']} src="/assets/imgs/Contact.png" />
              </div>
              <div class={Styles['title']}>Einfache Bezahlung</div>
              <div class={Styles['description']}>Paypal, Klarna, auf Rechnung</div>
            </div>
          </div>
        </div>

        <div class={Styles['button-row-container']}>
          <div class={Styles['button-row']}>
            <div
              class={Styles['button'] + ' ' + Styles['normal']}
              onClick={'window.open("tel:' + this.profile.phone + '")'}
            >
              <v-icon class={Styles['icon']}>fa-phone</v-icon>
            </div>
            <div
              class={Styles['button'] + ' ' + Styles['brand']}
              onClick={'window.open("https://facebook.com/' + this.profile.facebook.replace('@', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-facebook-f</v-icon>
            </div>
            <div
              class={Styles['button'] + ' ' + Styles['brand']}
              onClick={'window.open("https://instagram.com/' + this.profile.instagram.replace('@', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-instagram</v-icon>
            </div>
            <div
              class={Styles['button'] + ' ' + Styles['brand']}
              onClick={'window.open("https://api.whatsapp.com/send?phone=' + this.profile.phone.replace(' ', '') + '")'}
            >
              <v-icon class={Styles['icon']}>fab fa-whatsapp</v-icon>
            </div>
          </div>
        </div>
        {/*<div class={Styles['button-row-container']}>
          <div class={Styles['button-row']}>
            <div class={Styles['button']} onclick={'window.open("tel:' + this.profile.phone + '")'}>
              <v-icon>fa-phone</v-icon>
            </div>
            <div class={Styles['button']} onclick={'window.open("tel:' + this.profile.phone + '")'}>
              <v-icon>fa-video</v-icon>
            </div>
            <div
              class={Styles['button']}
              onclick={'window.open("https://api.whatsapp.com/send?phone=' + this.profile.phone.replace(' ', '') + '")'}
            >
              <v-icon>fab fa-whatsapp</v-icon>
            </div>
            <div class={Styles['button']} onclick={'window.open("mailto:' + this.profile.email + '")'}>
              <v-icon>fa-envelope</v-icon>
            </div>
          </div>
        </div>*/}

        <div class={Styles['stories']}>
          <div class={Styles['headline']}>Stories</div>
          {this.profile.stories.map((obj) => {
            return (
              <div class={Styles['story-container']}>
                <div class={Styles['story']}>
                  <img class={Styles['image']} src={obj.picture} />
                  <div class={Styles['description']}>{obj.description}</div>
                  <div class={Styles['date']}>{obj.date.toLocaleDateString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
