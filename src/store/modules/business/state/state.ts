import { IBusinessFilter, Business, Image } from '@/entities';

export class BusinessState {
  filter: IBusinessFilter = {};
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  currentlyEditedImage: Image | null = null;
}
