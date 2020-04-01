import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { BusinessState, BusinessGetters, BusinessMutations } from '..';
import { RootState } from '@/store';
import { IBusinessData } from '@/entities';

// This should be a part of http-service
// function createFilterQueryString(filterArray: IBusinessFilter): string {
//   return filterArray.toString();
// }

// This should be a part of DB-Service
function refreshDB(this: BusinessActions): void {
  // const filterString = createFilterQueryString(this.state.filter);
  //const { data } = await this.store.$http({ url: `/businesses${filterString}` }); // requeste aktuelle daten vom Server - evtl dummy erstmal?
  // TODO: Validiere Server-Response
  const data = [{ name: 'someBusiness' }];
  this.store.$db.businesses.list.bulkAdd(data as IBusinessData[]); // speichere Daten in Datenbank
}

export class BusinessActions extends Actions<BusinessState, BusinessGetters, BusinessMutations, BusinessActions> {
  public store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  async loadBusinesses(): Promise<void> {
    refreshDB.call(this);
    const businesses = await this.store.$db.businesses.find(this.state.filter); // Data from local indexedDB
    // TODO: Refresh rendered businesses with updated data from refreshDB!
    this.commit('SET_BUSINESSES', businesses);
  }
}
