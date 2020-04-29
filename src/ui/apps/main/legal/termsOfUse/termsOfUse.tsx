import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './../legal.scss';

@Component
export class TermsOfUsePage extends Vue {
  goBack(): void {
    this.$router.go(-1);
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div div class={Styles['legal']}>
        <div class={Styles['legal__title']}>Fehlt noch</div>
        <div onClick={() => this.goBack()} class={Styles['close-button']}>
          <v-icon class={Styles['icon']}>fa-times</v-icon>
        </div>
      </div>
    );
  }
}

export default TermsOfUsePage;
