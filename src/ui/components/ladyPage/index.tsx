import { VueComponent } from '@/ui/typings/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';

interface IProps {
  class?: string;
  centeredContent?: boolean;
}
@Component({
  name: 'LadyPage',
  props: {
    centeredContent: {
      type: Boolean,
      default: true,
    },
  },
})
export class LadyPage extends VueComponent<IProps> {
  public centeredContent?: boolean;

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={Styles['lady-page'] + ' ' + (this.centeredContent ? Styles['lady-page--centered'] : '')}>
        <img class={Styles['lady-page__logo']} src="/assets/imgs/wvh-pre-login_1500px.png" alt="Lady" />
        <article
          class={
            Styles['lady-page__content'] + ' ' + (this.centeredContent ? Styles['lady-page__content--centered'] : '')
          }
        >
          {this.$slots.default}
        </article>
      </div>
    );
  }
}

export default LadyPage;
