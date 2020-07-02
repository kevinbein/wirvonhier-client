import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './WVHImageInputField.scss';
import SharedStyles from 'styles';
import { WVHButton } from '../../wvhButton';

interface IProps {
  [key: string]: unknown;
  label: string;
  id: string;
  'is-valid': boolean;
  'error-messages': string[];
  required?: boolean;
  accept?: string;
}

interface IRefs {
  [key: string]: HTMLElement;
  fileInput: HTMLInputElement;
}

@Component({
  name: 'WVHImageInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
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
    requierd: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '*',
    },
  },
})
export class WVHImageInputField extends VueComponent<IProps, IRefs> {
  public id!: string;
  public maxLength?: number;
  public label!: string;
  public autocomplete!: string;
  public placeholder!: string;
  public errorMessages!: string[];
  public required!: boolean;
  public accept!: string;

  public update(e: Event): void {
    const value = (e.target as HTMLInputElement).files;
    this.$emit('change', { key: this.id, value });
  }

  public selectFile(e: Event): void {
    e.preventDefault();
    this.$refs.fileInput.click();
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={`${Styles['image-input__wrapper']} ${SharedStyles['input__wrapper']}`}>
        <label class={`${Styles['image-input__inner']}`}>
          {this.errorMessages.length > 0 && (
            <div class={`${SharedStyles['input__errors']}`}>
              {this.errorMessages.map((error) => (
                <div class={`${SharedStyles['input__error']}`}>{error}</div>
              ))}
            </div>
          )}
          <input
            ref="fileInput"
            type="file"
            accept={this.accept}
            tabindex="-999"
            style="visibility: hidden; position: absolute; top: -9999px; left: -9999px"
            on-change={this.update.bind(this)}
          />
          <WVHButton on-click={this.selectFile.bind(this)} primary class={Styles['image-input__button']}>
            {this.label}
          </WVHButton>
        </label>
      </div>
    );
  }
}
