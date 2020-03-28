import { DBInstance } from './db';

export type TableNames = 'apps';

export interface IDB {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businesses: DBInstance;
}

export interface IContact {}