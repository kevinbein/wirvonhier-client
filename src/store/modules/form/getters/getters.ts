import { Getters } from 'vuex-smart-module';
import { FormState } from '../state';

export class FormGetters extends Getters<FormState> {
  get getFormById() {
    return (formId: string) => this.state.formData.get(formId);
  }
}
