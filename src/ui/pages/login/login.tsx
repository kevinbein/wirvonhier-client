import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Login',
  render(): Vue.VNode {
    return <main>Login Page</main>;
  },
})
export class LoginPage extends Vue {}
