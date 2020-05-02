import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { IDataProtStatement } from '@/store/state/state.types';

@Component({
  props: {
    errorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
})
export class PrivacyAndAGBAgreement extends VueComponent<{}> {
  public get dataProtStatement(): IDataProtStatement {
    return this.$store.state.dataProtStatements[0];
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles['input']}`}>
        <label class={Styles['input__label']}>
          <span>
            Mit der Registrierung akzeptieren Sie unsere{' '}
            <router-link to={{ name: 'Privacy' }}>Datenschutzerkärung</router-link> und{' '}
            <router-link to={{ name: 'Nutzungsbedingungen' }}>Nutzungsbedingungen</router-link>.
          </span>
        </label>
      </div>
    );
  }
}
