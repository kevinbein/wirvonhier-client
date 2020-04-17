import { Actions, Context } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';
import { ICredentials, IRegisterOptions } from './actions.types';
import { IHttpResponse, ITokenPayload } from '@/services';
import JwtDecode from 'jwt-decode';
import { UserData } from '@/store/modules/userData';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;
  private user!: Context<typeof UserData>;

  $init(store: Store<RootState>): void {
    this.store = store;
    this.user = UserData.context(store);
  }

  async loadDataProtStatements(): Promise<void> {
    const statements = await this.store.$http.get('/data-prot-statements');
    this.commit('SET_DATA_PROT_STATEMENTS', statements);
  }

  async login(credentials: ICredentials): Promise<IHttpResponse> {
    try {
      const { token } = await this.store.$http.post('/login?strategy=local', credentials);
      const decoded = JwtDecode<ITokenPayload>(token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', token);
      return { status: 'success' };
    } catch (e) {
      return { status: 'failure', message: e.message };
    }
  }

  async register(registerOptions: IRegisterOptions): Promise<IHttpResponse> {
    try {
      const { token } = await this.store.$http.post('/register?strategy=local', registerOptions);
      const decoded = JwtDecode<ITokenPayload>(token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', token);
      return { status: 'success' };
    } catch (e) {
      return { status: 'failure', message: e.message };
    }
  }

  logout(): void {
    // TODO: reset all user-specifig data
  }
}
