export class RootState {
  someState = 1;
}

export function getRootState(): RootState {
  // set initial state from db
  return new RootState();
}
