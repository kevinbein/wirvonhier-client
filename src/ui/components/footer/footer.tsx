import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './footer.scss';
import SharedStyles from '@/ui/styles/main.scss';

@Component({
  name: 'Footer',
})
export class Footer extends Vue {
  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <footer role="footer" class={Styles.footer}>
        <router-link to={{ name: 'DataProtectionAgreement' }} class={SharedStyles['link--small']}>
          Datenschutz
        </router-link>
        <router-link to={{ name: 'TermsOfUse' }} class={SharedStyles['link--small']}>
          AGB
        </router-link>
        <router-link to={{ name: 'LegalNotice' }} class={SharedStyles['link--small']}>
          Impressum
        </router-link>
      </footer>
    );
  }
}
