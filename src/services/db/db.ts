import Dexie from 'dexie';
import { IDB, IContact } from './db.types';
import { IBusinessFilter } from '@/entities';

export class DB implements IDB {
  public businesses = new DBInstance('businesses');

  constructor() {
  }
}

export class DBInstance extends Dexie {
  public contacts: Dexie.Table<IContact, number>;
  private _v = 1;

  constructor(dbname: string) {
    super(dbname);
    this.version(this._v).stores({
      businesses: '++id, name, description, industry, type',
      contacts: '++id, name, state, city, street, zip, phone, email, whatsapp, facebook',
      hours: '++id, monday, tuesdas, wednesday, thursday, friday, saturday, sunday',
    });
    this.contacts = this.table('contacts');
  }

  find(_filter: IBusinessFilter) {
    return this.contacts;
    // filter list according to some filter rules
    // query API with this filter and store result in DB
    // update 
  }
}


export const db = new DB();
