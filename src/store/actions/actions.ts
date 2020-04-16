import { Actions } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';
import { ICredentials, IRegisterOptions } from './actions.types';
import { IHttpResponse } from '@/services';
import { router } from '@/ui';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;

  $init(store: Store<RootState>): void {
    this.store = store;
  }

  async loadDataProtStatements(): Promise<void> {
    const statements = await this.store.$http.get('/data-prot-statements');
    this.commit('SET_DATA_PROT_STATEMENTS', statements);
  }

  async login(credentials: ICredentials): Promise<IHttpResponse> {
    try {
      const res = await this.store.$http.post('/login?strategy=local', credentials);
      window.localStorage.setItem('token', res.token);
      this.commit('SET_TOKEN', res.token);
      return { status: 'success' };
    } catch (e) {
      return { status: 'failure', message: e.message };
    }
  }

  async register(registerOptions: IRegisterOptions): Promise<IHttpResponse> {
    try {
      const res = await this.store.$http.post('/register?strategy=local', registerOptions);
      window.localStorage.setItem('token', res.token);
      this.commit('SET_TOKEN', res.token);
      return { status: 'success' };
    } catch (e) {
      return { status: 'failure', message: e.message };
    }
  }
}
