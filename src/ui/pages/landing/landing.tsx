import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Landing',
  render(): Vue.VNode {
    return <main>Landing Page</main>;
  },
})
export class LandingPage extends Vue {}
