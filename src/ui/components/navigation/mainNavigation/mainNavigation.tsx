import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
import { NavigationContent } from './navigationContent';
import Styles from './mainNavigation.scss';

import { SlideInPage } from '@/ui';
@Component
export class MainNavigation extends VueComponent<{}> {
  public isVisible = false;

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles.navigation}>
        <button on-click={() => (this.isVisible = !this.isVisible)} class={Styles['navigation__trigger']}>
          <i class={`fa fa-${this.isVisible ? 'times' : 'bars'}`}></i>
        </button>
        <SlideInPage value={this.isVisible} closeButton={false} onClose={() => (this.isVisible = false)}>
          <NavigationContent on-close={() => (this.isVisible = false)} />
        </SlideInPage>
      </div>
    );
  }
}
