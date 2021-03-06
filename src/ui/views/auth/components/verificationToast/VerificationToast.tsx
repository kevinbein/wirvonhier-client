import Vue from 'vue';
import Component from 'vue-class-component';
import { AuthModule } from '@/store/modules';
import { store } from '@/store';
import Styles from './verificationToast.scss';

interface IProps {
  email?: string;
}

@Component({
  name: 'VerificationToast',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
})
export class VerificationToast extends Vue<IProps> {
  public authModule = AuthModule.context(store);
  public email!: string;

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <span>
        Dein Account ist noch nicht verifiziert. Bitte clicke auf den Verifizierungs-Link, den wir dir per E-Mail
        gesendet haben.{' '}
        <button
          class={Styles['verification-toast__send-again']}
          on-click={() => this.authModule.actions.requestVerificationEmail(this.email)}
        >
          Nochmal senden
        </button>
      </span>
    );
  }
}
