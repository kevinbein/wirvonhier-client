import Vue from 'vue';
import Component from 'vue-class-component';
import '@/ui/styles/global/index.scss';

@Component({
  name: 'App',
})
export class App extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return <router-view></router-view>;
  }
}
