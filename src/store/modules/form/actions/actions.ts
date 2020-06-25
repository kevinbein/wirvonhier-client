import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { FormState, FormGetters, FormMutations } from '..';
import { ISetFormDataPayload } from './actions.types';

export class FormActions extends Actions<FormState, FormGetters, FormMutations, FormActions> {
  // @ts-ignore
  private store!: Store<FormState>;

  $init(store: Store<FormState>): void {
    this.store = store;
  }

  update(payload: ISetFormDataPayload): void {
    this.commit('UPDATE_FORM_DATA', payload);
  }
}
