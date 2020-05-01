import { Business } from '@/entities';

export class UserDataState {
  id = null;
  email = '';
  businesses: string[] = [];
  userBusinesses: Business[] = [];
  verified = true;
  firstName = '';
  lastName = '';
}
