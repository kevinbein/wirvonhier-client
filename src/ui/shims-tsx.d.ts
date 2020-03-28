/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends VNode {}

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ElementClass extends Vue {}

    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elem: string]: any;
    }

    interface ElementAttributesProperty {
      $props: {};
    }
  }
}
