import Dexie from 'dexie';
import { IDB, IContact } from './db.types';
import { IBusinessFilter, IBusinessData } from '@/entities';

export class DBInstance extends Dexie {
  public contacts: Dexie.Table<IContact, number>;
  public list: Dexie.Table<IBusinessData, undefined>;
  private _v = 1;

  constructor(dbname: string) {
    super(dbname);

    // These are dummy indexes
    // Indexes need to be named in initialization if we want to query the table by this index
    // properties stored in the table without matching index will still be stored (just not searchable)
    this.version(this._v).stores({
      list: '++id, name, description, industry, type',
      contacts: '++id, name, state, city, street, zip, phone, email, whatsapp, facebook',
      hours: '++id, monday, tuesdas, wednesday, thursday, friday, saturday, sunday',
    });
    this.contacts = this.table('contacts');
    this.list = this.table('list');
  }

  async find(_filter: IBusinessFilter): Promise<IBusinessData[]> {
    return this.list
      .where('name')
      .equals('someBusiness')
      .toArray();
    // filter list according to some filter rules
    // query API with this filter and store result in DB
    // update
  }
}

export class DB implements IDB {
  public businesses = new DBInstance('businesses');
}

export const db = new DB();
