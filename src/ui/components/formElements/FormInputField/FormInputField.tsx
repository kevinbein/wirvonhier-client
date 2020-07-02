import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './FormInputField.scss';
import SharedStyles from 'styles';

type InputType = 'email' | 'hidden' | 'number' | 'password' | 'reset' | 'search' | 'tel' | 'text' | 'url';
interface IProps {
  ref?: string;
  label: string;
  'max-length'?: string;
  id: string;
  value: string;
  'is-valid'?: boolean;
  'error-messages'?: string[];
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  autofocus?: boolean;
  type?: InputType;
  icon?: string;
  disabled?: boolean;
  class?: string;
  attributes?: {
    placeholder?: string;
    autocomplete?: string;
    required?: boolean;
    autofocus?: boolean;
    type?: InputType;
    disabled?: boolean;
  };
  'on-change'?: ({ key, value }: { key: never; value: never }) => void;
}

interface IRefs {
  [key: string]: HTMLInputElement;
  input: HTMLInputElement;
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
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    attributes: {
      type: Object,
      default: () => ({}),
    },
  },
})
export class FormInputField extends VueComponent<IProps, IRefs> {
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
  public input!: HTMLInputElement;
  public icon!: string;
  public disabled!: boolean;
  public attributes!: IProps['attributes'];

  public get hasValue(): boolean {
    return typeof this.value !== 'undefined' && this.value !== '';
  }
  public mounted(): void {
    this.input = this.$refs.input;
  }

  public update(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit('change', { key: this.id, value });
  }

  public submit(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit('submit', { key: this.id, value });
  }

  public onFocus(): void {
    this.hasFocus = true;
  }
  public onBlur(): void {
    this.hasFocus = false;
  }

  public created(): void {
    if (this.value !== '' || this.autofocus == true) {
      this.hasFocus = true;
    } else {
      this.hasFocus = false;
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        class={`
          ${Styles['text-input']} 
          ${SharedStyles['input__wrapper']} 
          ${this.hasFocus || this.hasValue ? SharedStyles['input__wrapper--active'] : ''}
          ${this.icon ? Styles['text-input--with-button'] : ''}
        `}
      >
        <label
          for={this.id}
          class={`
            ${Styles['text-input']} 
            ${SharedStyles['input__label']} 
            ${this.hasFocus || this.hasValue ? SharedStyles['input__label--active'] : ''}
            ${this.attributes?.disabled ? SharedStyles['input__label--disabled'] : ''}
          `}
        >
          {this.label}
        </label>
        {(this.icon && (
          <div
            class={`
              ${SharedStyles['input__field']} 
              ${Styles['input-container']} 
              ${this.hasFocus || this.hasValue ? Styles['input-container--active'] : ''}
            `}
          >
            <input
              ref="input"
              id={this.id}
              type={this.type}
              attrs={this.attributes}
              class={`
                ${Styles['text-input']}
                ${Styles['input-container__input-field']}
                ${
                  this.hasFocus || this.hasValue
                    ? `${Styles['input-container__input-field--active']} ${SharedStyles['input__field--active']}`
                    : ''
                }
                ${this.icon ? Styles['text-input--with-button'] : ''}  
                ${
                  this.attributes?.disabled && (this.hasFocus || this.hasValue)
                    ? Styles['input-container__input-field--disabled']
                    : ''
                }
              `}
              value={this.value}
              on-input={this.update.bind(this)}
              on-focus={this.onFocus.bind(this)}
              on-blur={this.onBlur.bind(this)}
            />
            <button
              class={`
                ${Styles['input-container__button']}
                ${this.hasFocus || this.hasValue ? Styles['input-container__button--active'] : ''}
                ${this.attributes?.disabled ? Styles['input-container__button--disabled'] : ''}
              `}
              disabled={this.attributes?.disabled}
              on-click={this.submit.bind(this)}
            >
              <i
                class={`
                  ${Styles['input-container__button-icon']} 
                  ${this.icon}
                  ${this.hasFocus || this.hasValue ? Styles['input-container__button-icon--active'] : ''} 
                  ${this.attributes?.disabled ? Styles['input-container__button-icon--disabled'] : ''}
                  ${
                    (!this.hasFocus || !this.hasValue) && this.attributes?.disabled
                      ? Styles['input-container__button-icon--inactive--disabled']
                      : ''
                  } 
                  ${this.icon ? Styles['text-input--with-button'] : ''}
                `}
              ></i>
            </button>
          </div>
        )) || (
          <input
            ref="input"
            id={this.id}
            type={this.type}
            attrs={this.attributes}
            disabled={this.attributes?.disabled}
            required={this.attributes?.required}
            placeholder={this.attributes?.placeholder || ''}
            class={`
              ${Styles['text-input']}
              ${SharedStyles['input__field']}
              ${this.hasFocus || this.hasValue ? SharedStyles['input__field--active'] : ''}
              ${this.attributes?.disabled ? SharedStyles['input__field--disabled'] : ''}
            `}
            value={this.value}
            on-input={this.update.bind(this)}
            on-focus={this.onFocus.bind(this)}
            on-blur={this.onBlur.bind(this)}
          />
        )}
        <div
          class={`
            ${Styles['text-input']}
            ${SharedStyles['input__inner']}
            ${this.hasFocus || this.hasValue ? SharedStyles['input__inner--active'] : ''}
          `}
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
