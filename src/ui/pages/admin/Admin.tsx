import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Admin',
  render(): Vue.VNode {
    return <main>Nothing to see</main>;
  },
})
export class AdminPage extends Vue {}
