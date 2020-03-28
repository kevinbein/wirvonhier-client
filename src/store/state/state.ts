export function getRootState() {
  // set initial state from db
  return new RootState();
}

export class RootState {
  someState = 1;
}