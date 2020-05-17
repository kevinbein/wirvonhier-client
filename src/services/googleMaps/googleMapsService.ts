import { IStore } from '@/store';
import { DB, HTTP } from '..';

export class GoogleMapsService {
  // @ts-ignore
  private worker: unknown;
  // @ts-ignore
  private store: IStore;
  // @ts-ignore
  private http: HTTP;
  // @ts-ignore
  private db: DB;
  // Your personal API key.
  // Get it here: https://console.cloud.google.com/google/maps-apis
  private API_KEY = 'AIzaSyCWAaBJsI1234TI18PITVy7p0Qb6ht123';
  private CALLBACK_NAME: 'gmapsCallback' = 'gmapsCallback';
  private initialized!: boolean;
  private resolveInitPromise!: (value?: unknown) => void;
  private rejectInitPromise!: (value?: unknown) => void;
  private initPromise = new Promise((resolve, reject) => {
    this.resolveInitPromise = resolve;
    this.rejectInitPromise = reject;
  });

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
}
