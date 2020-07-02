import { Getters } from 'vuex-smart-module';
import { BusinessState } from '../state';
import { IStore } from '@/store';
import { IBusinessFilter, Media, IBusinessData, Business } from '@/entities';

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

  public getMixedStories(): Media[] {
    const businesses = this.state.businesses;
    const stories: Media[] = [];
    for (const business of businesses) {
      const businessStories = business.getSortedImagesAndVideos();
      stories.push(...businessStories);
    }
    stories.sort((story1: Media, story2: Media) => {
      const time1 = new Date(story1.modifiedAt).getTime();
      const time2 = new Date(story2.modifiedAt).getTime();
      return time2 - time1;
    });
    return stories;
  }
}
