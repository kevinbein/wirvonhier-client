import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { Location } from 'vue-router';
import Styles from './backButton.scss';
import { AppearanceModule } from '@/store';

interface IProps {
  title?: string;
  to?: Location;
}

@Component({
  name: 'BackButton',
  props: {
    title: {
      type: String,
      default: 'zurück',
    },
    to: {
      type: Object || undefined,
      default: () => null,
    },
  },
})
export class BackButton extends VueComponent<IProps> {
  public appearanceModule = AppearanceModule.context(this.$store);
  public title!: string;
  public to!: Location;

  public get target(): Location {
    if (this.to) return this.to;
    const lastRoute = this.appearanceModule.state.lastRoute;
    if (lastRoute) {
      return {
        name: lastRoute.name || '',
        path: lastRoute.path,
        query: lastRoute.query,
        params: lastRoute.params,
        hash: lastRoute.hash,
      };
    }
    return { name: 'Landing' };
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <router-link to={this.target} title={this.title} class={Styles['back-button']}>
        <i class="fa fa-chevron-left" />
        {this.$slots.default || this.title}
      </router-link>
    );
  }
}
