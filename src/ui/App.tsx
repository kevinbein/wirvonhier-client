import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'App',
  render(h): Vue.VNode {
    return (
      <v-app>
        <router-view></router-view>
      </v-app>
    );
  },
})
export class App extends Vue {}
