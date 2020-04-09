import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './map.scss';
import { CreateElement } from 'vue/types/umd';
import '../../plugins/leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
//import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'vue2-leaflet';

@Component({
  name: 'Map',
})
export class MapPage extends Vue {
  zoom = 17;
  // Center of Ravensburg
  //center: LatLng = new LatLng(47.78099, 9.61529);
  // Center of Vaihingen
  //center: LatLng = new LatLng(48.9316137, 8.9581946);
  center: LatLng = new LatLng(48.932237, 8.9585);
  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  icon = L.icon({
    iconUrl: './assets/imgs/logo/logo_80x80.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
  prototypeLocations = [
    {
      id: 1,
      name: '',
      description: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      phone: '',
      image: '',
      street: '',
      city: '',
      categories: ['kleidung'],
      categoryTags: ['kinder'],
      geolocation: { lat: '', lng: '' },
    },
    {
      id: 2,
      name: 'Buchhandlung Ravensbuch',
      description: '',
      personalMessage:
        'Wir liefern weiterhin aus! Portofrei und schnell! Bestellungen nehmen wir telefonisch, online und über whatsapp entgegen',
      email: '',
      website: 'www.ravensbuch.de',
      facebook: 'https://www.facebook.com/Mein.RavensBuch/',
      instagram: 'https://www.instagram.com/ravensbuch',
      phone: '0178 9056085',
      image: '',
      street: '',
      city: 'Ravensburg',
      categoryTags: ['kinder'],
      categories: ['kleidung'],
      geolocation: { lat: '', lng: '' },
    },
    {
      id: 3,
      name: 'Musikhaus Lange',
      description:
        'Das Musikhaus Lange ist ein traditionelles Fachgeschäft für Musikinstrumente in Ravensburg. Wir bieten eine große Auswahl an Instrumenten',
      personalMessage: 'Wir liefern und reparieren weiterhin für sie!',
      email: 'info@muskhaus-lange.de',
      website: 'https://www.musikhaus-lange.de/',
      facebook: 'https://www.facebook.com/musikhaus.lange.1',
      instagram: 'https://www.instagram.com/musikhauslange',
      phone: '0751 359000',
      image: 'musik-lange.jpg',
      street: 'Marktstraße 27',
      city: 'Ravensburg',
      categories: ['musik'],
      categoryTags: ['deko'],
      geolocation: { lat: '47.780990', lng: '9.615290' },
    },
    {
      id: 4,
      name: 'Buchhandlung Anna Rahm',
      description: '',
      email: 'info@mit-buechern-unterwegs.de',
      website: 'https://www.mit-buechern-unterwegs.de/index3a.html',
      facebook: '',
      instagram: '',
      phone: '0751 16737',
      image: '',
      street: 'Marktstraße 43',
      city: 'Ravensburg',
      categories: ['bücher'],
      categoryTags: ['kinder'],
      geolocation: { lat: '47.780550', lng: '9.615590' },
    },
    {
      id: 5,
      name: 'Firle und Franz',
      description: '',
      email: '',
      website: 'https://www.firleundfranz.de/',
      facebook: 'https://www.facebook.com/firleundfranz/',
      instagram: 'https://www.instagram.com/firleundfranz/',
      phone: '0751 18086773',
      image: '',
      street: 'Marktstraße 20',
      city: 'Ravensburg',
      categories: ['kleidung'],
      categoryTags: ['kinder'],
      geolocation: { lat: '47.780590', lng: '9.615300' },
    },
    {
      id: 6,
      name: 'Konditorei Henger',
      description:
        'Vor vielen Wochen sind wir für Sie in die Osterproduktion gegangen und haben wie jedes Jahr viel Liebe und Mühe in unsere Hasen, Eier und Lämmer gesteckt. Die momentane Lage verlangt von uns allen sehr viel ab. Gerade jetzt haben unsere Nerven und unsere Seelen ein süßes Trösterchen verdient! Erfreuen Sie damit ganz besonders Ihre Kinder und das feuchten in den Augen wird Sie dafür entschädigen.',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      phone: '0751 91050',
      image: '',
      street: 'Marktstraße 10',
      city: 'Ravensburg',
      categories: ['kleidung'],
      categoryTags: ['kinder'],
      geolocation: { lat: '47.781070', lng: '9.615000' },
    },
    {
      id: 7,
      name: 'Buchhandlung Immanuel',
      personalMessage:
        'Liebe Kundin, lieber Kunde,  aufgrund der Verodnung des Landes müssen wir unser Ladengeschäft schließen, wir stehen Ihnen aber weiterhin telefonisch und online zur Verfügung und versenden Bestellungen weiterhin portofrei! Bitte unterstützen Sie ihren Einzelhandel vor Ort in dieser schwierigen Zeit! Wir wünschen Ihnen viel Gesundheit und Segen für die kommenden Wochen',
      description: '',
      email: 'info@immanuel-buchladen.de',
      website: '',
      facebook: '',
      instagram: '',
      phone: '0751 23800',
      image: '',
      street: 'Marktstraße 23',
      city: 'Ravensburg',
      categories: ['buch'],
      categoryTags: ['kinder'],
      geolocation: { lat: '47.781139', lng: '9.615179' },
    },
    {
      id: 8,
      name: 'Reischmann',
      description: '',
      email: '',
      website: 'www.reischmann.biz',
      facebook: '',
      instagram: '',
      phone: '0751 361470',
      image: '',
      street: 'Kirchstraße 2-6',
      city: 'Ravensburg',
      categories: ['kleidung'],
      categoryTags: ['kinder'],
      geolocation: { lat: '47.782290', lng: '9.614103' },
    },
    {
      id: 9,
      name: 'FACHMARIE - DIE GLÜCKSBOUTIQUE',
      personalMessage: 'Bei akutem Geschenkbedarf / Support-Wunsch',
      description: '',
      email: 'info@fachmarie.de',
      website: 'fachmarie.de',
      facebook: '',
      instagram: '',
      phone: '0911 5689903',
      fax: '0911 5689904',
      image: '',
      street: 'Fürther Str. 50',
      city: 'Nürnberg',
      categories: ['geschenke'],
      categoryTags: ['kinder'],
      geolocation: { lat: '49.450927', lng: '11.056462' },
    },
    {
      id: 10,
      name: 'Kokon Fashion + Mode',
      personalMessage: 'Wenn Sie wünsche haben, reservieren wir Ihnen die Sachen selbstverständlich',
      description: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      phone: '0172 5134410',
      image: '',
      street: 'Gertigstraße 58',
      city: 'Hamburg',
      categories: ['kleidung'],
      categoryTags: ['kinder'],
      geolocation: { lat: '53.582638', lng: '10.017671' },
    },
    {
      id: 11,
      name: 'Blumen-Ursprung',
      personalMessage: 'Telefonisch und per mail sind wir weiterhin sehr gerne für sie da!!!!',
      description: '',
      email: 'blumen-ursprung@t-online.de',
      website: '',
      facebook: 'https://www.facebook.com/ChristophUrsprung/',
      instagram: '',
      phone: '069 5970283',
      image: '',
      street: 'Oeder Weg 77',
      city: 'Frankfurt am Main',
      categories: ['Blumengeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.123277', lng: '8.681111' },
    },
    {
      id: 12,
      name: 'Blumenbar',
      personalMessage: [
        'Bitte rufen Sie uns an!\n',
        'Wir stellen die Blumen zum Abholen vor die Hintertür, so daß das Ganze kontaktlos abgewickelt werden kann.',
      ],
      description: '',
      email: '',
      website: 'https://www.blumenbar.net/',
      facebook: 'https://www.facebook.com/Blumenbar-florale-Kunstst%C3%BCcke-142833069064854/',
      instagram: '',
      phone: '069 59795965',
      image: '',
      street: 'Eckenheimer Landstraße 74',
      city: 'Frankfurt am Main',
      categories: ['Blumengeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.124275', lng: '8.686577' },
    },
    {
      id: 13,
      name: 'Liebesdienste Home interior',
      personalMessage: [
        'die Zeiten sind unschön, der Handel und die Gastronomie müssen ums Überleben kämpfen und ihr könnt uns in unserem Kietz jetzt super mit dem Kauf von Gutscheinen unterstützen und direkt helfen.',
      ],
      description: '',
      email: 'info@liebesdienste-home.de',
      website: 'https://www.blumenbar.net/',
      facebook: 'facebook.de/liebesdienste.home',
      instagram: '',
      phone: '069 50927433',
      image: '',
      street: 'Oeder Weg 59',
      city: 'Frankfurt am Main',
      categories: ['Möbelgeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.122204', lng: '8.680452' },
    },
    {
      id: 14,
      name: 'BrauStil',
      personalMessage: [
        'Wir liefern in Frankfurt direkt am kommenden Tag frisch bis zur Haustüre.\n',
        'Oder ihr holt euch die Ware direkt bei uns am TakeAwayFenster ab.',
      ],
      description: '',
      email: 'willkommen@braustil.de',
      website: 'https://braustil.de/de/',
      facebook: 'https://www.facebook.com/braustil.ffm',
      instagram: '',
      phone: '069 98669557',
      image: '',
      street: 'Oeder Weg 57',
      city: 'Frankfurt am Main',
      categories: ['Brauereischänke'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.121875', lng: '8.680366' },
    },
    {
      id: 15,
      name: 'Modehaus Huesemann',
      personalMessage:
        'Nehmen Sie mit uns Kontakt auf, damit Sie unseren Liefer- und Abholservice in Anspruch nehmen können',
      description: 'Mode und Wäsche im Herzen von Ochtrup',
      email: 'info@modehaus-huesmann.de',
      website: 'https://modehaus-huesmann.de/impressum',
      facebook: '',
      instagram: '',
      phone: '+49 (0)2553 98240',
      image: '',
      street: 'Bahnhofstr. 2',
      city: 'Ochtrup',
      categories: ['Bekleidungsgeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '52.207942', lng: '7.188512' },
    },
    {
      id: 16,
      name: 'Schuh Peters',
      personalMessage: 'Wenn Ihnen ein Artiker in unserem Schaufenster gefällt, können Sie uns kontaktieren.',
      description: 'Mode und Wäsche im Herzen von Ochtrup',
      email: 'schuh-peters@t-online.de',
      website: 'https://gms-shoes.com/schuh-peters-in-rinteln?nobanner=1&cHash=dc22708c1a74c22dc7d736be81c94591',
      facebook: '',
      instagram: '',
      phone: '0172 42 69 588',
      image: '',
      street: 'Weserstr. 21',
      city: 'Rinteln',
      categories: ['Schuhgeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '52.187995', lng: '9.080451' },
    },
    {
      id: 17,
      name: 'Uhr Schmuck Keppler',
      personalMessage:
        'Unsere Türen müssen leider vorerst geschlossen bleiben, dennoch haben Sie weiterhin die Möglichkeit einen Wertgutschein oder eure Lieblingsschmuckstücke ganz einfach und kostenfrei nach Hause liefern zu lassen.',
      description: 'Schönes entdecken bei Uhren Schmuck Keppeler!',
      email: 'keppeler.uhren-schmuck@t-online.de',
      website: 'https://www.uhren-schmuck-keppeler.de/kontakt/',
      facebook: '',
      instagram: '',
      phone: '+49 8232 2700',
      image: '',
      street: 'Fuggerstr. 4',
      city: 'Schwabmünchen',
      categories: ['Juweliergeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '48.179574', lng: '10.758272' },
    },
    {
      id: 18,
      name: 'Schild - Der Anziehungspunkt in Günzburg',
      personalMessage: 'Gerne können Sie uns für Bestellungen telefonisch erreichen.',
      description: '',
      email: 'info@modehaus-schild.de',
      website: 'www.modehaus-schild.de',
      facebook: '',
      instagram: '',
      phone: '08221 / 3664-0',
      image: '',
      street: 'Marktplatz 17',
      city: 'Günzburg',
      categories: ['Bekleidungsgeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '48.455158', lng: '10.276753' },
    },
    {
      id: 19,
      name: 'Linkshänder',
      personalMessage: 'Online-Bestellungen werden wie gewohnt bearbeitet.',
      description: '',
      email: '',
      website: 'https://www.linkshaender.de/',
      facebook: '',
      instagram: '',
      phone: '0361 550 48 440',
      image: '',
      street: 'Krämerbrücke 24',
      city: 'Erfurt',
      categories: ['Haushaltswarengeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.978730', lng: '11.031071' },
    },
    {
      id: 20,
      name: 'Kirchenladen am Dom',
      personalMessage:
        'In Erfurt und Umgebung können wir Ihnen benötigte Ware persönlich vorbei bringen oder wir senden Ihnen die Ware gerne zu.',
      description: '',
      email: 'kontakt@kirchenladen-erfurt.de',
      website: 'https://www.kirchenladen-erfurt.de/',
      facebook: 'www.facebook.de/kirchenladenamdom',
      instagram: '',
      phone: '0361 / 2 119 119',
      image: '',
      street: 'Domplatz 25',
      city: 'Erfurt',
      categories: ['Fachhandel für Kirchenbedarf'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.976552', lng: '11.025352' },
    },
    {
      id: 21,
      name: 'Ballonidee',
      personalMessage: 'Gerne vereinbaren wir einen Termin zur Abholung oder Versand per DHL.',
      description: '',
      email: 'kontakt@ballonidee.de',
      website: 'https://ballonidee.de/',
      facebook: '',
      instagram: '',
      phone: '0361 561 69 33',
      image: '',
      street: 'Paulstraße 23',
      city: 'Erfurt',
      categories: ['Geschenkladen'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.976049', lng: '11.027373' },
    },
    {
      id: 22,
      name: 'Taschenkaufhaus Leipzig',
      personalMessage:
        'Unsere Filialen sind bis auf Weiteres geschlossen. Selbstverständlich sind wir weiterhin für Sie da – ab sofort aber nur online',
      description: 'Das Taschenkaufhaus mit über 85 Marken',
      email: 'leipzig@taschenkaufhaus.de',
      website: 'https://www.taschenkaufhaus.de/filiale-leipzig.html',
      facebook: 'https://www.facebook.com/Taschenkaufhaus',
      instagram: 'https://www.instagram.com/taschenkaufhaus/',
      phone: '0341 - 225 13 20',
      image: '',
      street: 'Ritterstraße 9-13',
      city: 'Leipzig',
      categories: ['Taschengeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '51.341163', lng: '12.379351' },
    },
    {
      id: 23,
      name: 'Profoto Brell',
      personalMessage: 'Wir bieten jeden Donnerstag einen NOT-Pass- und Visabild Service',
      description: '',
      email: '',
      website: 'https://fotobrell.com/',
      facebook: '',
      instagram: '',
      phone: '0228/4330850',
      image: '',
      street: 'Stockenstrasse 10',
      city: 'Bonn',
      categories: ['Fotofachgeschäft'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.734537', lng: '7.103369' },
    },
    {
      id: 24,
      name: 'Close Up',
      personalMessage: 'Online könnt ihr wie gewohnt direkt zu euch nach Hause bestellen',
      description: '',
      email: 'shop-bonn@closeup.de',
      website: 'https://www.closeup.de/bonn',
      facebook: 'www.facebook.com/CloseUpBonn',
      instagram: 'https://www.instagram.com/closeupposters/',
      phone: '+49 228 88 68 17 46',
      image: '',
      street: 'Sternstraße 58',
      city: 'Bonn',
      categories: ['Geschenkladen'],
      categoryTags: ['kinder'],
      geolocation: { lat: '50.735784', lng: '7.099055' },
    },
  ];

  //@Watch('zoom')

  updateZoom(zoom: number): void {
    this.zoom = zoom;
  }
  updateCenter(center: LatLng): void {
    this.center = center;
  }
  /*updateBounds(bounds) {
    this.bounds = bounds;
    console.log("update bounds");
  };*/

  openProfile(id: number): void {
    this.$router.push('/explore/' + id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public businesses: any | unknown = null;
  public async loadBusinesses(zip: number, _radius: number): Promise<void> {
    //public async loadBusinesses(location: LatLng, radius: number): Promise<void> {
    const data = await this.$http({
      method: 'get',
      //url: '/businesses?zip=' + zip + '&radius=' + radius,
      url: `/businesses?filter_address.zip=equals:${zip}&schema=story`,
      data: {},
    });
    // @ts-ignore
    this.businesses = data.businesses;

    /*j// As long as there are no images yet, generate and assign them from an array of given pictures
    for (let i = 0; i < this.businesses.length; ++i) {
      const index = i % this.testExplorerImages.length;
      this.businesses[i].story = this.testExplorerImages[index];
      this.businesses[i].geolocation = new LatLng(47.78099, 9.61529);
    }
    // eslint-disable-next-line no-console
    console.log('Added stories to businesses', this.businesses);*/
  }

  mounted(): void {
    const zip = 71665;
    //const location = new LatLng(47.78099, 9.61529);
    const radius = 100.42; // km
    (async () => {
      await this.loadBusinesses(zip, radius);
    })();

    //let map = new L.Map('leafletmap', {
    //center: this.center,
    //zoom: this.zoom,
    //});
    //map.on('click', (e: L.LeafletMouseEvent) => {
    //L.marker(e.latlng)
    //.bindPopup('Popup')
    //.addTo(map)
    //.openPopup();
    //});j
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div class={Styles['map-page']}>
        {/*
        <v-app-bar class={Styles['app-bar']}>
          <v-btn icon>
            <v-icon class={Styles['filter-icon']}>fa-filter</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class={Styles['title']}>Karte</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon class={Styles['close-icon']}>fa-times</v-icon>
          </v-btn>
        </v-app-bar>
        */}

        <div class={Styles['wvh-header']}>
          <div class={Styles['logo-container']}>
            <img class={Styles['logo']} src="./assets/imgs/logo/logo-schrift_4722x1868.png" />
          </div>
        </div>

        <router-link to="explore" class={Styles['close-button']}>
          <v-icon class={Styles['icon']}>fa-times</v-icon>
        </router-link>

        <div ref="leafletmap" class={Styles['map']}>
          {/*<l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">*/}
          <l-map style="height: 100%; width: 100%" zoom={this.zoom} center={this.center}>
            <l-tile-layer url={this.url}></l-tile-layer>
            {(this.businesses !== null &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              this.businesses.map((business: any) => {
                if (
                  business.location &&
                  business.location.geo &&
                  business.location.geo.coordinates &&
                  business.location.geo.coordinates.length == 2
                ) {
                  const latLng = [business.location.geo.coordinates[1], business.location.geo.coordinates[0]];
                  return (
                    <l-marker
                      onClick={() => this.openProfile(business.id)}
                      lat-lng={latLng}
                      icon={this.icon}
                    ></l-marker>
                  );
                }
                return '';
              })) || <div>Loading ...</div>}
          </l-map>
        </div>
      </div>
    );
  }
}
