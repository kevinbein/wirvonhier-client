import { VueComponent } from '@/ui/typings/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { IDataProtStatement } from '@/store/modules/wvh/state/state.types';
import { WVHModule } from '@/store';

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
  public wvhModule = WVHModule.context(this.$store);
  public get dataProtStatement(): IDataProtStatement {
    return this.wvhModule.state.dataProtStatements[0];
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
