import { Mutations } from 'vuex-smart-module';
import Vue from 'vue';
import { BusinessState } from '../state';
import { Business, Image, IBusinessFilter, Video } from '@/entities';

export class BusinessMutations extends Mutations<BusinessState> {
  SET_BUSINESSES(businesses: Business[]): void {
    Vue.set(this.state, 'businesses', businesses);
  }

  SET_FILTERED_SLIDES({ filter, slides }: { filter: string; slides: (Image | Video)[] }): void {
    const newMap = new Map(this.state.filteredSlides);
    const filteredSlides = newMap.get(filter) || [];
    filteredSlides.push(...slides);
    newMap.set(filter, filteredSlides);
    Vue.set(this.state, 'filteredSlides', newMap);
  }

  SET_SELECTED_BUSINESS(business: Business): void {
    Vue.set(this.state, 'selectedBusiness', business);
  }

  SELECT_IMAGE_TO_EDIT(image: Image | null): void {
    this.state.currentlyEditedImage = image;
  }

  SET_PAGE(page: number): void {
    this.state.page = page;
  }
  SET_LAST_PAGE(lastPage: number): void {
    this.state.lastPage = lastPage;
  }

  SET_FILTER(filter: IBusinessFilter): void {
    this.state.filters.push(filter);
  }

  CLEAR_FILTER(filterName: string): void {
    const remainingFilters = this.state.filters.filter((filter) => filter.name !== filterName);
    Vue.set(this.state, 'filters', remainingFilters);
  }

  CLEAR_ALL_FILTERS(): void {
    Vue.set(this.state, 'filters', []);
  }

  SET_CURRENT_EXPLORER_INDEX(newIndex: number): void {
    this.state.currentExplorerIndex = newIndex;
  }
}
