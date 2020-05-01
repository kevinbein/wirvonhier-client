import Vue from 'vue';
import Component from 'vue-class-component';
import { rootModule } from '@/store';
import { store } from '@/store';

@Component({
  name: 'VerificationToast',
})
export class VerificationToast extends Vue {
  public rootStore = rootModule.context(store);

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <span>
        Dein Account ist noch nicht verifiziert. Bitte clicke auf den Verifizierungs-Link, den wir dir per E-Mail
        gesendet haben. <button on-click={this.rootStore.actions.requestVerificationEmail}>Nochmal senden.</button>
      </span>
    );
  }
}
