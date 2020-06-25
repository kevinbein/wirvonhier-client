import { Actions } from 'vuex-smart-module';
import { WVHState, WVHMutations } from '..';
import { IHttpActionResponse, IHttpErrorResponse, IHttpSuccessResponse } from '@/services';
import { IDataProtStatement } from '../state/state.types';
import { IStore } from '@/store';

export class WVHActions extends Actions<WVHState, never, WVHMutations, WVHActions> {
  private store!: IStore;

  $init(store: IStore): void {
    this.store = store;
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
}
