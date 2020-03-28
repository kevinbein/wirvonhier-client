import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Explore',
  render(): Vue.VNode {
    return <main>Explore Page</main>;
  },
})
export class ExplorePage extends Vue {}
