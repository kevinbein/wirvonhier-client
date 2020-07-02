import { Business } from '@/entities';
import { IUserData } from './state.types';

export class UserDataState implements IUserData {
  [key: string]: unknown;

  id: string | null = null;
  email = '';
  businesses: string[] = [];
  userBusinesses: Business[] = [];
  selectedBusiness: Business | null = null;
  isVerified = true;
  firstName = '';
  lastName = '';
  createdAt = new Date(0);
}
