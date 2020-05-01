import { Actions, Context } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';
import { ICredentials, IRegisterOptions } from './actions.types';
import { ITokenPayload, IHttpActionResponse } from '@/services';
import JwtDecode from 'jwt-decode';
import { UserModule } from '@/store/modules/user';
import { Route } from 'vue-router';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;
  private user!: Context<typeof UserModule>;

  $init(store: Store<RootState>): void {
    this.store = store;
    this.user = UserModule.context(store);
  }

  async loadDataProtStatements(): Promise<void> {
    const { data } = await this.store.$http.get('/data-prot-statements');
    this.commit('SET_DATA_PROT_STATEMENTS', data.data);
  }

  async login(credentials: ICredentials): Promise<IHttpActionResponse> {
    try {
      const { data } = await this.store.$http.post('/login?strategy=local', credentials);
      const decoded = JwtDecode<ITokenPayload>(data.token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', data.token);
      return { status: 'success' };
    } catch (e) {
      const statusCode = e.response.status;
      const message =
        statusCode >= 400 && statusCode < 500
          ? 'E-Mail oder Passwort falsch.'
          : 'Unbekannter Fehler. Bitte versuche es später erneut.';
      return { status: 'failure', message };
    }
  }

  async register(registerOptions: IRegisterOptions): Promise<IHttpActionResponse> {
    try {
      const { data } = await this.store.$http.post('/register?strategy=local', registerOptions);
      const decoded = JwtDecode<ITokenPayload>(data.token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', data.token);
      return { status: 'success' };
    } catch (e) {
      const statusCode = e.response.status;
      const message =
        statusCode >= 400 && statusCode < 500
          ? `Oops! Da ging etwas schief. Bitte kontaktiere uns unter: ${this.state.emails.support}.`
          : 'Unbekannter Fehler. Bitte versuche es später erneut.';
      return { status: 'failure', message };
    }
  }

  async requestNewPassword({ email }: { email: string }): Promise<IHttpActionResponse> {
    const res = await this.store.$http.post('/request-new-password', { email });
    if ('error' in res)
      return {
        status: 'failure',
        message: `Oops! Da ging etwas schief. Bitte kontaktiere uns unter: ${this.state.emails.support}.`,
      };
    return { status: 'success' };
  }

  async resetPassword({ password, token }: { password: string; token: string }): Promise<IHttpActionResponse> {
    const res = await this.store.$http.post('/reset-password', { password, token });
    if ('error' in res)
      return {
        status: 'failure',
        message: `Oops! Da ging etwas schief. Bitte kontaktiere uns unter: ${this.state.emails.support}.`,
      };
    return { status: 'success' };
  }

  async requestVerificationEmail(email: string): Promise<IHttpActionResponse> {
    const res = await this.store.$http.post('/resend-email-verification', { email });
    if ('error' in res)
      return {
        status: 'failure',
        message: `Oops! Wir konnten keine E-Mail an Sie versenden. Bitte kontaktieren Sie uns unter: ${this.state.emails.support}.`,
      };
    return { status: 'success', email: res.data.email };
  }

  async verifyUserEmail(verificationToken: string): Promise<IHttpActionResponse> {
    const res = await this.store.$http.post('/verify-email', { verificationToken });
    if ('error' in res)
      return {
        status: 'failure',
        message: `Oops! Wir konnten Ihre E-Mail nicht verifizieren. Bitte kontaktiere Sie uns unter: ${this.state.emails.support}.`,
      };
    return { status: 'success', verified: res.data.verified };
  }

  async hasPermission(_route: Route): Promise<boolean> {
    const token = this.state.token;
    try {
      const payload = JwtDecode<ITokenPayload>(token);
      const isExpired = Date.now() >= payload.exp * 1000;
      if (!isExpired) return true;
    } catch (e) {
      // invalid token; refresh
    }
    const { status } = await this.store.$http.get('/me', true);
    return status === 'success';
  }

  logout(): void {
    this.commit('SET_TOKEN', '');
    window.document.cookie = 'public_refresh_token=0; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    this.user.actions.setUserData({ id: null });
    this.store.$http.post('/logout', {});
  }
}
