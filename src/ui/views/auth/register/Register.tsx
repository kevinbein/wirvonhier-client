import Vue from 'vue';
import Component from 'vue-class-component';
import { RegisterForm } from './RegisterForm';
import { WVHButton } from '@/ui';
import Styles from './register.scss';
import SharedStyles from 'styles';
import { AppearanceModule } from '@/store';
import { BackButton } from '@/ui';

@Component({
  name: 'Register',
  components: {
    BackButton,
  },
})
export class Register extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(false);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['register__page']}`}>
        <BackButton />
        <div class={Styles['register__title']}>Werden Sie Mitglied!</div>
        <RegisterForm />
        <div class={Styles['register__existing-user']}>
          <p class={Styles['text--primary']}>Sie haben bereits einen Account?</p>
          <WVHButton class={Styles['register__button']} to={{ name: 'BusinessLogin' }}>
            JETZT EINLOGGEN
          </WVHButton>
        </div>
      </div>
    );
  }
}
