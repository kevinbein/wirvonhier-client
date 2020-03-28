import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Map',
  render(): Vue.VNode {
    return <main>Map Page</main>;
  },
})
export class MapPage extends Vue {}
