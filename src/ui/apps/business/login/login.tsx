import Component from 'vue-class-component';
import Styles from './login.scss';
import Vue from 'vue';
import LoginForm from './LoginForm/LoginForm';
import { WVHButton, Footer } from '@/ui';
import { UserModule } from '@/store';

@Component({
  name: 'BusinessLogin',
  watch: {
    userId: {
      immediate: true,
      handler(newId) {
        if (newId) this.$router.push({ name: 'BusinessDashboard' });
      },
    },
  },
})
export class BusinessLoginPage extends Vue {
  public userModule = UserModule.context(this.$store);

  public get userId(): string | null {
    return this.userModule.state.id;
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles.page} ${Styles['login__page']}`}>
        <div class={Styles['login__title']}>Willkommen,</div>
        <div class={Styles['login__subtitle']}>
          schön Sie zu sehen! Bitte melden Sie sich unten an um Ihr Profil zu verwalten.
        </div>
        <LoginForm />
        <p class={Styles['text--primary']}>Sie haben noch keinen Account?</p>
        <WVHButton class={Styles['login__button']}>JETZT MITGLIED WERDEN</WVHButton>
        <Footer />
      </div>
    );
  }
}

export default BusinessLoginPage;
