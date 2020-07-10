import Dexie from 'dexie';
import { IDB } from './db.types';
import { IBusinessFilter, IBusinessData } from '@/entities';

export class DBInstance extends Dexie {
  public list: Dexie.Table<IBusinessData, string>;
  private _v = 1;

  constructor(dbname: string) {
    super(dbname);

    // These are dummy indexes
    // Indexes need to be named in initialization if we want to query the table by this index
    // properties stored in the table without matching index will still be stored (just not searchable)
    this.version(this._v).stores({
      list: '_id, id, name, description, category, location, distance',
    });
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

  addMany(data: IBusinessData[]): void {
    this.list.bulkPut(data).then(
      () => {
        // eslint-disable-next-line no-console
        console.log(`Added ${data.length} objects to Datastore.`);
      },
      (e: Dexie.BulkError) => {
        // eslint-disable-next-line no-console
        console.log(
          `Added ${data.length - e.failures.length} objects to Datastore. ${e.failures.length} failed. ${e.message}`,
        );
      },
    );
  }
}

export class DB implements IDB {
  public businesses = new DBInstance('businesses');
}

export const db = new DB();
