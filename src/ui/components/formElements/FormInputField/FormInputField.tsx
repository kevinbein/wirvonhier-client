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
  'is-valid'?: boolean;
  'error-messages'?: string[];
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  autofocus?: boolean;
  type?: InputType;
  icon?: string;
  centered?: boolean;
  disabled?: boolean;
  class?: string;
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
    icon: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    disabled: {
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
  public icon!: string;
  public centered!: boolean;
  public disabled!: boolean;

  public update(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit('change', { key: this.id, value });
  }

  public submit(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit('submit', { key: this.id, value });
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
        class={`
          ${Styles['text-input']} 
          ${SharedStyles['input__wrapper']} 
          ${this.hasFocus ? SharedStyles['input__wrapper--active'] : ''}
          ${this.icon ? Styles['text-input--with-button'] : ''}
        `}
      >
        <label
          for={this.id}
          class={`
            ${Styles['text-input']} 
            ${SharedStyles['input__label']} 
            ${this.hasFocus ? SharedStyles['input__label--active'] : ''}
            ${this.disabled ? SharedStyles['input__label--disabled'] : ''}
          `}
        >
          {this.label}
        </label>
        {(this.icon && (
          <div
            class={`
              ${SharedStyles['input__field']} 
              ${Styles['input-container']} 
              ${this.hasFocus ? Styles['input-container--active'] : ''}
            `}
          >
            <input
              id={this.id}
              type={this.type}
              autocomplete={this.autocomplete}
              placeholder={this.placeholder}
              autofocus={this.autofocus}
              disabled={this.disabled}
              class={`
                ${Styles['text-input']}
                ${Styles['input-container__input-field']}
                ${
                  this.hasFocus
                    ? `${Styles['input-container__input-field--active']} ${SharedStyles['input__field--active']}`
                    : ''
                }
                ${this.icon ? Styles['text-input--with-button'] : ''}  
                ${this.centered ? Styles['input-container__input-field--centered'] : ''}
                ${this.disabled && this.hasFocus ? Styles['input-container__input-field--disabled'] : ''}
              `}
              value={this.value}
              on-input={this.update.bind(this)}
              on-focus={this.changeFocus.bind(this)}
              on-blur={this.changeFocus.bind(this)}
            />
            <button
              class={`
                ${Styles['input-container__button']}
                ${this.hasFocus ? Styles['input-container__button--active'] : ''}
                ${this.disabled ? Styles['input-container__button--disabled'] : ''}
              `}
              disabled={this.disabled}
              on-click={this.submit.bind(this)}
            >
              <i
                class={`
                  ${Styles['input-container__button-icon']} 
                  ${this.icon}
                  ${this.hasFocus ? Styles['input-container__button-icon--active'] : ''} 
                  ${this.disabled ? Styles['input-container__button-icon--disabled'] : ''}
                  ${!this.hasFocus && this.disabled ? Styles['input-container__button-icon--inactive--disabled'] : ''} 
                  ${this.icon ? Styles['text-input--with-button'] : ''}
                `}
              ></i>
            </button>
          </div>
        )) || (
          <input
            id={this.id}
            type={this.type}
            autocomplete={this.autocomplete}
            placeholder={this.placeholder}
            autofocus={this.autofocus}
            disabled={this.disabled}
            class={`
              ${Styles['text-input']}
              ${SharedStyles['input__field']}
              ${this.hasFocus ? SharedStyles['input__field--active'] : ''}
              ${this.centered ? Styles['input__field--centered'] : ''}
              ${this.disabled ? SharedStyles['input__field--disabled'] : ''}
            `}
            value={this.value}
            on-input={this.update.bind(this)}
            on-focus={this.changeFocus.bind(this)}
            on-blur={this.changeFocus.bind(this)}
          />
        )}
        <div
          class={`
            ${Styles['text-input']}
            ${SharedStyles['input__inner']}
            ${this.hasFocus ? SharedStyles['input__inner--active'] : ''}
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
