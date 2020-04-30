import { IBusiness, IBusinessData } from './business.types';

export class Business implements IBusiness {
  readonly id?: string;
  readonly name: string;

  constructor(data: IBusinessData) {
    this.id = data.id;
    this.name = data.name;
  }
}
