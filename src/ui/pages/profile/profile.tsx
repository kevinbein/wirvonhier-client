import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Profile',
  render(): Vue.VNode {
    return <main>Profile Page</main>;
  },
})
export class ProfilePage extends Vue {}
