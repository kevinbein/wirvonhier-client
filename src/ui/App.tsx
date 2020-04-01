import Vue from 'vue';
import Component from 'vue-class-component';
import '@/ui/styles/global/index.scss';

// Check ui/styles/global for directly used classes

@Component({
  name: 'App',
  render(h): Vue.VNode {
    return (
      <v-app class="some-unabstracted-class">
        <router-view></router-view>
      </v-app>
    );
  },
})
export class App extends Vue {}
