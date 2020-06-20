export interface IAutocompleteOptions {
  input: HTMLInputElement;
  bounds?: Bounds;
  fields?: PlaceResultField[];
  callback?: (arg?: IAddressComponent[]) => void;
}

export interface IAddressComponent {
  short_name: string;
  long_name: string;
  types: AddressComponentType[];
}
type AddressComponentType = 'street_number' | 'route' | 'locality' | 'postal_code' | string;

export type Bounds = 'currentPosition' | { lng: number; lat: number };

export type PlaceResultField =
  | 'address_component'
  | 'adr_address'
  | 'aspects'
  | 'business_status'
  | 'formatted_address'
  | 'formatted_phone_number'
  | 'geometry'
  | 'html_attributions'
  | 'icon'
  | 'international_phone_number'
  | 'name'
  | 'opening_hours'
  | 'permanently_close'
  | 'photos'
  | 'place_id'
  | 'plus_code'
  | 'price_level'
  | 'rating'
  | 'reviews'
  | 'types'
  | 'url'
  | 'user_ratings_total'
  | 'utc_offset'
  | 'utc_offset_minutes'
  | 'vicinity'
  | 'website';
