import Vue from 'vue';

interface IRef {
  [key: string]: Vue | Element | HTMLElement | Vue[] | Element[] | HTMLElement[];
}

export class VueComponent<P, R extends IRef = IRef> extends Vue {
  $props!: P;
  $refs!: R;
}
