import { Actions, Context } from 'vuex-smart-module';
import { Store } from 'vuex';
import { RootState, RootGetters, RootMutations } from '..';
import { ICredentials, IRegisterOptions } from './actions.types';
import { ITokenPayload, IHttpActionResponse, IHttpErrorResponse, IHttpSuccessResponse } from '@/services';
import JwtDecode from 'jwt-decode';
import { UserModule } from '@/store/modules/user';
import { Route } from 'vue-router';
import { IDataProtStatement } from '../state/state.types';

export class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  private store!: Store<RootState>;
  private user!: Context<typeof UserModule>;

  $init(store: Store<RootState>): void {
    this.store = store;
    this.user = UserModule.context(store);
  }

  async loadDataProtStatements(): Promise<IHttpActionResponse> {
    const { status, ...res } = await this.store.$http.get<{ statements: IDataProtStatement[] }>(
      '/data-prot-statements',
    );
    if (status === 'failure') {
      const error = (res as IHttpErrorResponse<{ statements: IDataProtStatement[] }>).error;
      const statusCode = error?.response?.status || 500;
      const message =
        statusCode >= 400 && statusCode < 500
          ? 'E-Mail oder Passwort falsch.'
          : 'Unbekannter Fehler. Bitte überprüfe deine Internetverbindung und versuche es später erneut.';
      return { status: 'failure', message };
    } else {
      const data = (res as IHttpSuccessResponse<{ statements: IDataProtStatement[] }>).data;
      this.commit('SET_DATA_PROT_STATEMENTS', data);
      return { status: 'success' };
    }
  }

  async login(credentials: ICredentials): Promise<IHttpActionResponse> {
    const { status, ...res } = await this.store.$http.post<{ token: string }>('/login?strategy=local', credentials);
    if (status === 'failure') {
      const error = (res as IHttpErrorResponse<{ token: string }>).error;
      const statusCode = error?.response?.status || 500;
      const message =
        statusCode >= 400 && statusCode < 500
          ? 'E-Mail oder Passwort falsch.'
          : 'Unbekannter Fehler. Bitte überprüfe deine Internetverbindung und versuche es später erneut.';
      return { status: 'failure', message };
    } else {
      const data = (res as IHttpSuccessResponse<{ token: string }>).data;
      const decoded = JwtDecode<ITokenPayload>(data.token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', data.token);
      return { status: 'success' };
    }
  }

  async register(registerOptions: IRegisterOptions): Promise<IHttpActionResponse> {
    const { status, ...res } = await this.store.$http.post<{ token: string }>(
      '/register?strategy=local',
      registerOptions,
    );
    if (status === 'failure') {
      const error = (res as IHttpErrorResponse<{ token: string }>).error;
      const statusCode = error?.response?.status || 500;
      const message =
        statusCode >= 400 && statusCode < 500
          ? `Oops! Da ging etwas schief. Bitte kontaktiere uns unter: ${this.state.emails.support}.`
          : 'Unbekannter Fehler. Bitte versuche es später erneut.';
      return { status: 'failure', message };
    } else {
      const data = (res as IHttpSuccessResponse<{ token: string }>).data;
      const decoded = JwtDecode<ITokenPayload>(data.token);
      this.user.actions.setUserData({ id: decoded.id, email: decoded.email });
      this.commit('SET_TOKEN', data.token);
      return { status: 'success' };
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
    const { status, ...res } = await this.store.$http.post<{ email: string }>('/resend-email-verification', { email });
    if (status === 'failure') {
      return {
        status: 'failure',
        message: `Oops! Wir konnten keine E-Mail an Sie versenden. Bitte kontaktieren Sie uns unter: ${this.state.emails.support}.`,
      };
    } else {
      const data = (res as IHttpSuccessResponse<{ email: string }>).data;
      return { status: 'success', email: data && data.email };
    }
  }

  async verifyUserEmail(verificationToken: string): Promise<IHttpActionResponse> {
    const { status, ...res } = await this.store.$http.post<{ verified: string }>('/verify-email', {
      verificationToken,
    });
    if (status === 'failure') {
      return {
        status: 'failure',
        message: `Oops! Wir konnten Ihre E-Mail nicht verifizieren. Bitte kontaktiere Sie uns unter: ${this.state.emails.support}.`,
      };
    } else {
      const data = (res as IHttpSuccessResponse<{ verified: string }>).data;
      return { status: 'success', verified: data && data.verified };
    }
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
