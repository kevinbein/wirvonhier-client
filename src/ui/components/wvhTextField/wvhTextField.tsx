import Component from 'vue-class-component';
import Styles from './wvhTextField.scss';
import { VueComponent } from '@/ui/vue-ts-component';

interface IProps {
  class?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
  value?: string | number;
  icon?: string;
  centered?: boolean;
  onInput?: Function;
  onSubmit?: Function;
}
@Component({
  name: 'wvh-button',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
})
export class WVHTextField extends VueComponent<IProps> {
  public type?: string;
  public disabled?: boolean;
  public label?: string;
  public value?: string | number;
  public icon?: string;
  public centered?: boolean;

  public updateInput(): void {
    const newValue = this.$refs['input-field'].value;
    this.$emit('input', newValue);
  }

  public onClick(): void {
    const newValue = this.$refs['input-field'].value;
    this.$emit('submit', newValue);
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <div onInput={() => this.updateInput()} class={Styles['wvh-text-field']}>
        <div
          class={`
          ${Styles['label']} 
          ${this.icon ? Styles['label--with-button'] : ''}  
          ${this.centered ? Styles['label--centered'] : ''}
        `}
        >
          {this.label}
        </div>
        <div class={Styles['input-container']}>
          <input
            type={this.type}
            ref="input-field"
            disabled={this.disabled}
            class={`
              ${Styles['input']} 
              ${this.icon ? Styles['input--with-button'] : ''}  
              ${this.centered ? Styles['input--centered'] : ''}
              ${this.disabled ? Styles['input--disabled'] : ''}
            `}
            value={this.value}
          />
          {this.icon && (
            <button class={Styles['button']} disabled={this.disabled} onClick={() => this.onClick()}>
              <i
                class={`${Styles['button__icon']} ${this.icon}  ${
                  this.disabled ? Styles['button__icon--disabled'] : ''
                }`}
              ></i>
            </button>
          )}
        </div>
      </div>
    );
  }
}
