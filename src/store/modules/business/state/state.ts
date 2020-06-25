import { IBusinessFilter, Business } from '@/entities';

export class BusinessState {
  filter: IBusinessFilter = {};
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
}
