import { IDataProtStatement } from './state.types';

export class WVHState {
  dataProtStatements: IDataProtStatement[] = [];
  emails = {
    support: 'office@wirvonhier.net',
  };
}

export function getWVHState(): WVHState {
  // set initial state from db
  return new WVHState();
}
