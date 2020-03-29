import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'App',
  render(h): Vue.VNode {
    return (
      <v-app>
        <v-btn color="success">Hello</v-btn>
      </v-app>
    );
  },
})
export class App extends Vue {}
