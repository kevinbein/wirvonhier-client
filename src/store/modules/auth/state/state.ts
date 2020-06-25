export class AuthState {
  token = '';
}

export function getRootState(): AuthState {
  // set initial state from db
  return new AuthState();
}
