import { VueStrong } from '@/ui';
import Component from 'vue-class-component';
import { rootModule } from '@/store';
import { IHttpResponse } from '@/services';

@Component({
  name: 'UserVerify',
})
export class VerifyPage extends VueStrong {
  public rootStore = rootModule.context(this.$store);
  public status = false;

  created(): void {
    const token = this.$route.query.token;
    if (typeof token !== 'string') {
      return;
    }
    const res = this.rootStore.actions.verifyUserEmail(token) as IHttpResponse;
    this.status = res.status;
    if ('error' in res) {
      // eslint-disable-next-line no-console
      console.log(res.error);
    }
  }
  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return <div>{this.status}</div>;
  }
}

export default VerifyPage;
