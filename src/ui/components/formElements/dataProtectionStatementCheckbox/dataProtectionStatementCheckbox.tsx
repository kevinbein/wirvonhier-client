import { VueComponent } from '@/ui/vue-ts-component';
import Component from 'vue-class-component';
import Styles from './styles.scss';
import { IDataProtStatement } from '@/store/state/state.types';

interface IProps {
  value: boolean;
}

@Component({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    errorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
})
export class DataProtStatementComponent extends VueComponent<IProps> {
  public value!: boolean;
  public errorMessages!: string[];

  public get dataProtStatement(): IDataProtStatement {
    return this.$store.state.dataProtStatements[0];
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <div class={`${Styles['input']}`}>
        <label
          class={Styles['input__label--checkbox']}
          on-click={() => this.$emit('update-value', !this.value ? this.dataProtStatement.version : '')}
        >
          <div class={`${Styles['checkbox']} ${this.value ? Styles['checkbox--active'] : ''}`} />
          <span>
            Bitte akzeptieren Sie unsere{' '}
            <router-link to={{ name: 'Privacy' }} target="_blank">
              Datenschutzerkärung
            </router-link>{' '}
            und{' '}
            <router-link to={{ name: 'Nutzungsbedingungen' }} target="_blank">
              AGBs
            </router-link>
            .
          </span>
        </label>
        <div class={Styles['input__error-messages']}>
          {this.errorMessages.map((msg) => (
            <div class={Styles['input__error-message']}>{msg}</div>
          ))}
        </div>
      </div>
    );
  }
}
