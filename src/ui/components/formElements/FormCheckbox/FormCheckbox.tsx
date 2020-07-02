import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
//import Styles from './FormCheckbox.scss';
import SharedStyles from 'styles';

interface IProps {
  label: string;
  id: string;
  value: boolean | string | number;
  currentValue?: boolean | string | number;
  'is-valid'?: boolean;
  'error-messages'?: string[];
}
@Component({
  name: 'FormCheckbox',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [Boolean, String, Number],
      required: true,
    },
    currentValue: {
      type: [Boolean, String, Number],
      default: '',
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
})
export class FormCheckbox extends VueComponent<IProps> {
  public id!: string;
  public maxLength?: number;
  public label!: string;
  public value!: boolean | string | number;
  public currentValue!: boolean | string | number;
  public errorMessages!: string[];

  public get isChecked(): boolean {
    return this.currentValue === this.value;
  }

  public update(): void {
    this.$emit('change', { key: this.id, value: !this.isChecked });
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles['selection__wrapper']}`} on-click={this.update.bind(this)}>
        <div
          class={
            this.isChecked
              ? `${SharedStyles['selection__checkbox']} ${SharedStyles['selection__checkbox--selected']}`
              : `${SharedStyles['selection__checkbox']}`
          }
        />
        <label
          class={
            this.isChecked
              ? `${SharedStyles['selection__label']} ${SharedStyles['selection__label--active']}`
              : `${SharedStyles['selection__label']}`
          }
        >
          {this.label}
        </label>
        <div class={`${SharedStyles['selection__markup']}`}>
          {this.errorMessages.length > 0 && (
            <div class={`${SharedStyles['selection__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${SharedStyles['selection__error']}`}>{error}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
