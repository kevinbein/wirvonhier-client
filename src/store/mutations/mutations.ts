import Vue from 'vue';
import { Mutations } from 'vuex-smart-module';
import { RootState } from '../state';

export class RootMutations extends Mutations<RootState> {
  SET_DATA_PROT_STATEMENTS(statements: unknown): void {
    Vue.set(this.state, 'dataProtStatements', statements);
  }
  SET_TOKEN(token: string): void {
    this.state.token = token;
  }
}
