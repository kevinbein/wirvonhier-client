import { Business } from '@/entities';

export interface IUserData {
  [key: string]: unknown;
  id: string | null;
  email: string;
  businesses: string[];
  userBusinesses: Business[];
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: Date;
}
