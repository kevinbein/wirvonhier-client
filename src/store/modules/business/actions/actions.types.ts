import { Business } from '@/entities';

export interface IBusinessUpdateOptions {
  business: Business;
  key: string;
  value: string;
}
