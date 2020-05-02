import { VueStrong } from '@/ui';
import Component from 'vue-class-component';
import { rootModule } from '@/store';
import SharedStyles from '@/ui/styles/main.scss';

@Component({
  name: 'BusinessUploadVideo',
})
export class BusinessUploadVideo extends VueStrong {
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

export default BusinessUploadVideo;
