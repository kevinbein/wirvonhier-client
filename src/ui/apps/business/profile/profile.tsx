import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './profile.scss';

@Component({
  name: 'BusinessProfile',
})
export class BusinessProfilePage extends Vue {
  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['profile-page']}>
        <div>dis the profile page</div>
      </div>
    );
  }
}
