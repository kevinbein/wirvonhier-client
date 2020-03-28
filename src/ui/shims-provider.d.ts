/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IProvider, http } from '@/services';
import VueI18n from 'vue-i18n';
import { DB } from '@/services/db';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    services?: IProvider;
    http?: typeof http;
    db?: DB;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: IProvider;
    $http: typeof http;
    $db: DB;
    $worker: any;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $services: IProvider;
    $i18n: VueI18n;
    $http: typeof http;
    $db: DB;
    $worker: any;
  }
}
