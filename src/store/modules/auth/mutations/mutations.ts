import { Mutations } from 'vuex-smart-module';
import { AuthState } from '../state';

export class AuthMutations extends Mutations<AuthState> {
  SET_TOKEN(token: string): void {
    this.state.token = token;
  }
}
