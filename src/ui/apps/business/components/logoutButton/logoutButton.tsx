import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './logoutButton.scss';
//import { db } from '@/db_tmp';

@Component({
  name: 'LogoutButton',
})
export class LogoutButton extends Vue {
  logout(): void {
    this.$router.push('/business');
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['logout']} onClick={() => this.logout()}>
        <span class={Styles['message'] + ' pseudo-link'}>Logout</span>
        <v-icon class={Styles['icon']}>fa-sign-out-alt</v-icon>
      </div>
    );
  }
}
