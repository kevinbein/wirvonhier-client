import Vue from 'vue';

interface IRef {
  [key: string]: Vue | Element | Vue[] | Element[] | any;
}

export class VueComponent<P, R extends IRef = IRef> extends Vue {
  $props!: P;
  $refs!: R;
}
