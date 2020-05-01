import { Actions, Context } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';
import { ICredentials, IRegisterOptions } from './actions.types';
import { IHttpResponse, ITokenPayload } from '@/services';
import JwtDecode from 'jwt-decode';
import { UserModule } from '@/store/modules/user';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;
  private user!: Context<typeof UserModule>;

  $init(store: Store<RootState>): void {
    this.store = store;
    this.user = UserModule.context(store);
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

  async requestVerificationEmail(): Promise<void> {
    // ask server to resend verification
    // eslint-disable-next-line no-console
    console.log('requesting...');
  }

  async verifyUserEmail(verificationToken: string): Promise<IHttpResponse> {
    const res = await this.store.$http.post('/verify', { verificationToken });
    if ('error' in res) return { status: 'failure', error: res.error };
    return { status: 'success' };
  }

  logout(): void {
    // TODO: reset all user-specifig data
  }
}
