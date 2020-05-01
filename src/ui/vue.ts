import Vue, { VueConstructor } from 'vue';
import { IStore } from '@/store';

abstract class VueStrongClass extends Vue {
  public $store!: IStore;
}
export const VueStrong = Vue as VueConstructor<VueStrongClass>;

export default VueStrong;
