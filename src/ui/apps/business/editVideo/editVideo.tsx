import Vue from 'vue';
import Component from 'vue-class-component';
import { rootModule } from '@/store';
import SharedStyles from '@/ui/styles/main.scss';

@Component({
  name: 'BusinessEditVideo',
})
export class BusinessEditVideo extends Vue {
  public rootStore = rootModule.context(this.$store);

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <main role="main" class={SharedStyles.page}>
        Create new BUsiness
      </main>
    );
  }
}

export default BusinessEditVideo;
