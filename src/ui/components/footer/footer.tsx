import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './footer.scss';

@Component({
  name: 'Footer',
})
export class Footer extends Vue {
  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <footer role="footer" class={Styles.footer}>
        <router-link to={{ name: 'DataProtectionAgreement' }} class={Styles['link--small']}>
          Datenschutz
        </router-link>
        <router-link to={{ name: 'TermsOfUse' }} class={Styles['link--small']}>
          AGB
        </router-link>
        <router-link to={{ name: 'LegalNotice' }} class={Styles['link--small']}>
          Impressum
        </router-link>
      </footer>
    );
  }
}
