import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './FormTextArea.scss';
import SharedStyles from 'styles';

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
  name: 'FormTextArea',
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
export class FormTextArea extends VueComponent<IProps> {
  public id!: string;
  public maxLength?: number;
  public label!: string;
  public value!: string;
  public placeholder!: string;
  public errorMessages!: string[];
  public required!: boolean;
  public hasFocus = false;

  public get hasValue(): boolean {
    return typeof this.value !== 'undefined' && this.value !== '';
  }

  public get currentLength(): number {
    return this.value.length;
  }

  public update(e: Event): void {
    const value = (e.target as HTMLTextAreaElement).value;
    this.$emit('change', { key: this.id, value });
  }

  public onFocus(): void {
    this.hasFocus = true;
  }
  public onBlur(): void {
    this.hasFocus = false;
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
          this.hasFocus || this.hasValue
            ? `${SharedStyles['input__wrapper']} ${SharedStyles['input__wrapper--active']}`
            : `${SharedStyles['input__wrapper']}`
        }
      >
        <label
          for={this.id}
          class={
            this.hasFocus || this.hasValue
              ? `${Styles['textarea']} ${SharedStyles['input__label']} ${SharedStyles['input__label--active']}`
              : `${Styles['textarea']} ${SharedStyles['input__label']}`
          }
        >
          {this.label}
        </label>
        <textarea
          id={this.id}
          placeholder={this.placeholder}
          class={
            this.hasFocus || this.hasValue
              ? `${Styles['textarea__field']} ${SharedStyles['input__field']} ${SharedStyles['input__field--active']}`
              : `${Styles['textarea__field']} ${SharedStyles['input__field']}`
          }
          value={this.value}
          on-input={this.update.bind(this)}
          on-focus={this.onFocus.bind(this)}
          on-blur={this.onBlur.bind(this)}
        />
        <div
          class={
            this.hasFocus || this.hasValue
              ? `${Styles['textarea__inner']} ${SharedStyles['input__inner']} ${SharedStyles['input__inner--active']}`
              : `${Styles['textarea__inner']} ${SharedStyles['input__inner']}`
          }
        >
          {this.errorMessages.length > 0 && (
            <div class={`${Styles['textarea']} ${SharedStyles['input__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${SharedStyles['input__error']} ${Styles['textarea']}`}>{error}</div>
              ))}
            </div>
          )}
          <span class={`${Styles['textarea']} ${SharedStyles['input__max-length']}`}>
            {this.maxLength ? `${this.currentLength} / ${this.maxLength} Zeichen` : this.currentLength}
          </span>
        </div>
      </div>
    );
  }
}
