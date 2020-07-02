import { Mutations } from 'vuex-smart-module';
import Vue from 'vue';
import { BusinessState } from '../state';
import { Business, Image } from '@/entities';

export class BusinessMutations extends Mutations<BusinessState> {
  SET_BUSINESSES(businesses: Business[]): void {
    Vue.set(this.state, 'businesses', businesses);
  }

  SET_SELECTED_BUSINESS(business: Business): void {
    Vue.set(this.state, 'selectedBusiness', business);
  }

  SELECT_IMAGE_TO_EDIT(image: Image | null): void {
    this.state.currentlyEditedImage = image;
  }
}
