import { Getters } from 'vuex-smart-module';
import { BusinessState } from '../state';
import { IStore } from '@/store';
import { IBusinessFilter, Story } from '@/entities';

export class BusinessGetters extends Getters<BusinessState> {
  store!: IStore;

  $init(store: IStore): void {
    this.store = store;
  }

  get find() {
    return (filter: IBusinessFilter) => {
      return this.store.$db.businesses.find(filter);
    };
  }

  public getMixedStories(): Story[] {
    const businesses = this.state.businesses;
    const stories = [];
    for (let i = 0; i < businesses.length; i++) {
      for (const imageOrVideo of businesses[i].getSortedImagesAndVideos()) {
        const story = new Story(imageOrVideo, businesses[i]);
        stories.push(story);
      }
    }
    stories.sort((story1: Story, story2: Story) => {
      const time1 = new Date(story1.modified).getTime();
      const time2 = new Date(story2.modified).getTime();
      return time1 - time2;
    });
    return stories;
  }
}
