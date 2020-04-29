import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './../legal.scss';

@Component
export class TermsOfUsePage extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
    <div div class={Styles['legal']}>
      <div class={Styles['legal__title']}>Fehlt noch</div>
      <router-link to="/" class={Styles['close-button']}>
        <v-icon class={Styles['icon']}>fa-times</v-icon>
      </router-link>
    </div>);
  }
}

export default TermsOfUsePage;
