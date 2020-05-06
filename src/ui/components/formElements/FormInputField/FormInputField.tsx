import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './FormInputField.scss';
import SharedStyles from '@/ui/styles/main.scss';

type InputType = 'email' | 'hidden' | 'number' | 'password' | 'reset' | 'search' | 'tel' | 'text' | 'url';
interface IProps {
  label: string;
  'max-length'?: string;
  id: string;
  value: string;
  'is-valid': boolean;
  'error-messages': string[];
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  autofocus?: boolean;
  type?: InputType;
}

@Component({
  name: 'FormInputField',
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
    autocomplete: {
      type: String,
      default: 'off',
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
})
export class FormInputField extends VueComponent<IProps> {
  public id!: string;
  public maxLength?: number;
  public label!: string;
  public value!: string;
  public autocomplete!: string;
  public placeholder!: string;
  public errorMessages!: string[];
  public required!: boolean;
  public type!: InputType;
  public autofocus!: boolean;
  public hasFocus = false;

  public update(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit('change', { key: this.id, value });
  }

  public changeFocus(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (!target.value) {
      this.hasFocus = !this.hasFocus;
    }
  }

  public created(): void {
    if (this.value !== '') {
      this.hasFocus = true;
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        class={
          this.hasFocus
            ? `${Styles['text-input']} ${SharedStyles['input__wrapper']} ${SharedStyles['input__wrapper--active']}`
            : `${Styles['text-input']} ${SharedStyles['input__wrapper']}`
        }
      >
        <label
          for={this.id}
          class={
            this.hasFocus
              ? `${Styles['text-input']} ${SharedStyles['input__label']} ${SharedStyles['input__label--active']}`
              : `${Styles['text-input']} ${SharedStyles['input__label']}`
          }
        >
          {this.label}
        </label>
        <input
          id={this.id}
          type={this.type}
          autocomplete={this.autocomplete}
          placeholder={this.placeholder}
          autofocus={this.autofocus}
          class={
            this.hasFocus
              ? `${Styles['text-input']} ${SharedStyles['input__field']} ${SharedStyles['input__field--active']}`
              : `${Styles['text-input']} ${SharedStyles['input__field']}`
          }
          value={this.value}
          on-input={this.update.bind(this)}
          on-focus={this.changeFocus.bind(this)}
          on-blur={this.changeFocus.bind(this)}
        />
        <div
          class={
            this.hasFocus
              ? `${Styles['text-input']} ${SharedStyles['input__inner']} ${SharedStyles['input__inner--active']}`
              : `${Styles['text-input']} ${SharedStyles['input__inner']}`
          }
        >
          {this.errorMessages.length > 0 && (
            <div class={`${Styles['text-input']} ${SharedStyles['input__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${Styles['text-input']} ${SharedStyles['input__error']}`}>{error}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
