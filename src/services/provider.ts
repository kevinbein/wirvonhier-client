import { IProvider } from './provider.types';
import { BusinessService } from './business';
import { DB } from '@/services/db';
import { HTTP } from './http';
import { IStore } from '@/store';

export function provider(store: IStore, worker: unknown, db: DB, http: HTTP): IProvider {
  return {
    business: new BusinessService(store, worker, db, http),
  };
}
