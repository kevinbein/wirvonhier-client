import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './WVHCheckboxField.scss';
import SharedStyles from '@/ui/styles/main.scss';

interface IProps {
  label: string;
  id: string;
  value: boolean;
  'is-valid'?: boolean;
  'error-messages'?: string[];
}
@Component({
  name: 'WVHCheckbox',
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
      type: Boolean,
      required: true,
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
export class WVHCheckboxField extends VueComponent<IProps> {
  public id!: string;
  public maxLength?: number;
  public label!: string;
  public value!: boolean;
  public errorMessages!: string[];

  public update(): void {
    const value = !this.value;
    this.$emit('change', { key: this.id, value });
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles['checkbox__wrapper']} ${SharedStyles['input__wrapper']}`}>
        <label class={`${Styles['checkbox__inner']} ${SharedStyles['input__inner']}`} on-click={this.update.bind(this)}>
          {this.errorMessages.length > 0 && (
            <div class={`${Styles['checkbox__errors']} ${SharedStyles['input__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${SharedStyles['input__error']} ${Styles['checkbox__error']}`}>{error}</div>
              ))}
            </div>
          )}
          <div class={`${Styles['checkbox__label']} ${SharedStyles['input__label']}`}>{this.label}</div>
          <div class={`${Styles['checkbox']} ${this.value ? Styles['checkbox--active'] : ''}`} />
        </label>
      </div>
    );
  }
}
