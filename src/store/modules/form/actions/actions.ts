import { Actions } from 'vuex-smart-module';
import { FormState, FormGetters, FormMutations } from '..';
import { ISetFormDataPayload } from './actions.types';
import { IStore } from '@/store';

export class FormActions extends Actions<FormState, FormGetters, FormMutations, FormActions> {
  // @ts-ignore
  private store!: IStore;

  $init(store: IStore): void {
    this.store = store;
  }

  update(payload: ISetFormDataPayload): void {
    this.commit('UPDATE_FORM_DATA', payload);
  }
}
