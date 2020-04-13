/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IProvider, HTTP } from '@/services';
import VueI18n from 'vue-i18n';
import { DB } from '@/services/db';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    services?: IProvider;
    http?: HTTP;
    db?: DB;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: IProvider;
    $http: HTTP;
    $db: DB;
    $worker: any;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $services: IProvider;
    $i18n: VueI18n;
    $http: HTTP;
    $db: DB;
    $worker: any;
  }
}
