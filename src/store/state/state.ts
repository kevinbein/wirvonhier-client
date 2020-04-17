import { Location, IDataProtStatement } from './state.types';

export class RootState {
  currentLocation: undefined | Location = undefined;
  currentZip: undefined | string = undefined;

  dataProtStatements: IDataProtStatement[] | null = null;

  token = '';
}

export function getRootState(): RootState {
  // set initial state from db
  return new RootState();
}
