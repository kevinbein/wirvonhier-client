import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Business',
  render(): Vue.VNode {
    return <main>Business Page</main>;
  },
})
export class BusinessPage extends Vue {}
