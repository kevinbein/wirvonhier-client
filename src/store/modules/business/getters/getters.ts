import { Getters } from 'vuex-smart-module';
import { BusinessState } from '../state';
import { IStore } from '@/store';
import { IBusinessFilter, Image, IBusinessData, Business, Video } from '@/entities';
import { IQuery } from '@/services';

export class BusinessGetters extends Getters<BusinessState> {
  store!: IStore;

  $init(store: IStore): void {
    this.store = store;
  }

  get find() {
    return async (filter: IBusinessFilter) => {
      const businesses = await this.store.$db.businesses.find(filter);
      return businesses.map((data: IBusinessData) => new Business(data));
    };
  }

  get activeFilter(): IQuery {
    return {
      page: this.state.page,
      limit: this.state.limit,
      filters: this.state.filters,
    };
  }

  public get businessById() {
    return (businessId: string) => this.state.businesses.find((b) => b.id === businessId);
  }

  public get filteredSlides(): (Image | Video)[] {
    return this.state.filteredSlides.get(JSON.stringify(this.state.filters)) || [];
  }
}
