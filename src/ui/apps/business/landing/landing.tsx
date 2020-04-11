import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './landing.scss';

@Component({
  name: 'BusinessLanding',
})
export class BusinessLandingPage extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['landing-page']}>
        <div>Let me land :o</div>
      </div>
    );
  }
}
