import { VueStrong } from '@/ui';
import Component from 'vue-class-component';
import { rootModule } from '@/store';

@Component({
  name: 'CreateBusiness',
})
export class CreateBusinessPage extends VueStrong {
  public rootStore = rootModule.context(this.$store);

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return <div>Create new BUsiness</div>;
  }
}

export default CreateBusinessPage;
