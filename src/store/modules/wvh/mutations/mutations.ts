import Vue from 'vue';
import { Mutations } from 'vuex-smart-module';
import { WVHState } from '../state';

export class WVHMutations extends Mutations<WVHState> {
  SET_DATA_PROT_STATEMENTS(statements: unknown): void {
    Vue.set(this.state, 'dataProtStatements', statements);
  }
}
