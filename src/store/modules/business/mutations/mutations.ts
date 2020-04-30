import { Mutations } from 'vuex-smart-module';
import Vue from 'vue';
import { BusinessState } from '../state';
import { IBusiness } from '@/entities';

export class BusinessMutations extends Mutations<BusinessState> {
  SET_BUSINESSES(businesses: IBusiness[]): void {
    Vue.set(this.state, 'businesses', businesses);
  }
}
