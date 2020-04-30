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
  },
})
export class DataProtStatementComponent extends VueComponent<IProps> {
  public value!: boolean;

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
            <router-link to={{ name: this.$route.name, query: { dataProtModal: true } }}>
              Datenschutzerkärung
            </router-link>
            .
          </span>
        </label>
      </div>
    );
  }
}
