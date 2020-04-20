import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './../legal.scss';

@Component
export class TermsOfUsePage extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return <div class={Styles['legal']}>Fehlt noch</div>;
  }
}

export default TermsOfUsePage;
