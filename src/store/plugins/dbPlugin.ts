import { IStore } from '@/store';

export function dbPlugin(store: IStore): void {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'ADD_BUSINESSES': {
        break;
      }
      case 'REMOVE_BUSINESSES': {
        break;
      }
      default:;
    }
  });
}
