import { Mutations } from 'vuex-smart-module';
import { FormState } from '../state';
import { ISetFormDataPayload } from '../actions/actions.types';

export class FormMutations extends Mutations<FormState> {
  UPDATE_FORM_DATA(payload: ISetFormDataPayload): void {
    const { formId, data } = payload;
    const form = this.state.formData.get(formId) || {};
    const updatedForm = Object.assign(form, data);
    const newMap = this.state.formData;
    newMap.set(formId, updatedForm);
    this.state.formData = newMap;
  }
}
