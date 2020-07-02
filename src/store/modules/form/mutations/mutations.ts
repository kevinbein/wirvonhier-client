import { Mutations } from 'vuex-smart-module';
import { FormState } from '../state';
import { ISetFormDataPayload } from '../actions/actions.types';
import Vue from 'vue';

export class FormMutations extends Mutations<FormState> {
  UPDATE_FORM_DATA(payload: ISetFormDataPayload): void {
    const { formId, data } = payload;
    const form = this.state.formData.get(formId) || {};
    const updatedForm = Object.assign(form, data);
    const newMap = new Map(this.state.formData);
    newMap.set(formId, updatedForm);
    Vue.set(this.state, 'formData', newMap);
  }
}
