import { IBusinessFilter, Business } from '@/entities';

export class BusinessState {
  someValue = 1;
  filter: IBusinessFilter = {};
  businesses: Business[] = [];
}
