import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './WVHTextareaField.scss';
import SharedStyles from '@/ui/styles/main.scss';

interface IProps {
  label: string;
  'max-length'?: number;
  id: string;
  value: string;
  'is-valid'?: boolean;
  'error-messages'?: string[];
  placeholder?: string;
  required?: boolean;
}

@Component({
  name: 'WVHTextArea',
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
      type: String,
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
    maxLength: {
      type: Number,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
})
export class WVHTextareaField extends VueComponent<IProps> {
  public maxLength?: number;
  public value!: string;
  public placeholder!: string;
  public errorMessages!: string[];
  public required!: boolean;

  public get currentLength(): number {
    return this.value.length;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles['textarea__wrapper']} ${SharedStyles['input__wrapper']}`}>
        <label class={`${Styles['textarea__label']} ${SharedStyles['input__label']}`}>
          {this.errorMessages.length > 0 && (
            <div class={`${Styles['textarea__errors']} ${SharedStyles['input__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${SharedStyles['input__error']} ${Styles['textarea__error']}`}>{error}</div>
              ))}
            </div>
          )}
          <textarea class={Styles.textarea} />
          <span class={Styles['textarea__max-length']}>
            {this.currentLength} {this.maxLength ? `${this.currentLength} / ${this.maxLength} ` : ''}
          </span>
        </label>
      </div>
    );
  }
}
