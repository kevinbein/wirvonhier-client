import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'NavBar',
  render(h): Vue.VNode {
    return (
      <v-app-bar dark>
        <v-btn icon right>
          <v-icon>fa-map</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Map</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>fa-heart</v-icon>
        </v-btn>
      </v-app-bar>
    );
  },
})
export class NavBar extends Vue {}
