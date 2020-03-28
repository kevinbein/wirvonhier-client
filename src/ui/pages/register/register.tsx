import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Register',
  render(): Vue.VNode {
    return <main>Register Page</main>;
  },
})
export class RegisterPage extends Vue {}
