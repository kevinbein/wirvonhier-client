import Component from 'vue-class-component';
import Styles from './login.scss';
import SharedStyles from 'styles';
import Vue from 'vue';
import { LoginForm } from './LoginForm';
import { WVHButton } from '@/ui';
import { AppearanceModule } from '@/store';
import { BackButton } from '@/ui';

@Component({
  name: 'Login',
  components: {
    BackButton,
  },
})
export class Login extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['login__page']}`}>
        <BackButton />
        <div class={Styles['login__title']}>Willkommen zurück!</div>
        <LoginForm />
        <div class={Styles['login__new-user']}>
          <p class={Styles['text--primary']}>Sie haben noch keinen Account?</p>
          <WVHButton class={Styles['login__button']} to={{ name: 'BusinessRegister' }}>
            JETZT MITGLIED WERDEN
          </WVHButton>
        </div>
      </div>
    );
  }
}
