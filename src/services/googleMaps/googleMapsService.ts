/* eslint-disable @typescript-eslint/camelcase */
import { IStore } from '@/store';
import { DB, HTTP } from '..';
import { Bounds, IAutocompleteOptions, IAddressComponent } from './googleMapsService.types';
import { TYPE, POSITION } from 'vue-toastification';
import { RequestLocationToast } from '@/ui/components/toasts/requestLocationToast/RequestLocationToast';

export class GoogleMapsService {
  // @ts-ignore
  private worker: unknown;
  // @ts-ignore
  private store: IStore;
  // @ts-ignore
  private http: HTTP;
  // @ts-ignore
  private db: DB;
  private API_KEY = GOOGLE_MAPS_API_KEY;
  private CALLBACK_NAME: 'gmapsCallback' = 'gmapsCallback';
  private initialized!: boolean;
  private resolveInitPromise!: (value?: unknown) => void;
  private rejectInitPromise!: (value?: unknown) => void;
  private initPromise = new Promise((resolve, reject) => {
    this.resolveInitPromise = resolve;
    this.rejectInitPromise = reject;
  });
  private autoComplete: google.maps.places.Autocomplete | null = null;

  constructor(store: IStore, worker: unknown, db: DB, http: HTTP) {
    this.worker = worker;
    this.db = db;
    this.http = http;
    this.store = store;
    this.initialized = !!window.google;
  }

  public init(): Promise<unknown> {
    if (this.initialized) return this.initPromise;
    this.initialized = true;

    // The callback function is called by
    // the Google Maps script if it is
    // successfully loaded.
    window[this.CALLBACK_NAME] = () => this.resolveInitPromise(window.google);

    // We inject a new script tag into
    // the `<head>` of our HTML to load
    // the Google Maps script.
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}&libraries=places&callback=${this.CALLBACK_NAME}`;
    script.onerror = this.rejectInitPromise;
    document.querySelector('head')?.appendChild(script);
    return this.initPromise;
  }

  public async initAutocomplete(options: IAutocompleteOptions): Promise<void> {
    if (!google) return; // TODO: Handle error case -> GoogleMaps API not initialized
    const { fields, bounds, callback, input } = options;
    this.autoComplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    this.autoComplete.setFields(fields);
    await this.setBounds(bounds);
    this.autoComplete.addListener('place_changed', () => {
      const addressComponents: IAddressComponent[] | undefined = this.autoComplete?.getPlace().address_components;
      if (callback) callback(addressComponents);
    });
  }

  public destroyAutocomplete(): void {
    this.autoComplete?.unbindAll();
    this.autoComplete = null;
  }

  public geocode(address: string): void | Promise<[number, number]> {
    if (!google) return;
    const geoCoder = new google.maps.Geocoder();
    return new Promise((resolve) => {
      geoCoder.geocode({ address }, (results, status: string) => {
        if (status === 'OK') {
          const { location } = results[0].geometry;
          resolve([location.lng(), location.lat()]);
        } else {
          resolve();
        }
      });
    });
  }

  public async requestUserLocation(): Promise<{
    status: 'success' | 'failure';
    code?: 0 | 1 | 2;
    position?: [number, number];
  }> {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        resolve({ status: 'failure', code: 0 });
      }
      const { geolocation } = navigator;
      this.store.$toast(
        {
          component: RequestLocationToast,
          listeners: {
            granted() {
              geolocation.getCurrentPosition(
                (pos) => {
                  resolve({ status: 'success', position: [pos.coords.longitude, pos.coords.latitude] });
                },
                () => {
                  resolve({ status: 'failure', code: 2 });
                },
                {
                  maximumAge: 1000 * 60 * 10,
                  timeout: 1000 * 5,
                },
              );
            },
            denied: () => resolve({ status: 'failure', code: 1 }),
          },
        },
        {
          type: TYPE.INFO,
          position: POSITION.TOP_CENTER,
          timeout: false,
        },
      );
    });
  }

  private async setBounds(bounds?: Bounds): Promise<void> {
    if (!bounds) return;
    if (bounds === 'currentPosition') {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve();
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const geolocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            const circle = new google.maps.Circle({ center: geolocation, radius: pos.coords.accuracy });
            this.autoComplete?.setBounds(circle.getBounds());
            resolve();
          },
          () => {
            resolve();
          },
        );
      });
    }
  }
}
