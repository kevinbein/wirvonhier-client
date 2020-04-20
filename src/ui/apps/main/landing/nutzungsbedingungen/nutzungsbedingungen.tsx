import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './nutzungsbedingungen.scss';

@Component
export class Nutzungsbedingungen extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return <div class={Styles['nutzungsbedingungen']}>Fehlt noch</div>;
  }
}

//export default Impressum;
