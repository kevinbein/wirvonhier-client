import Component from 'vue-class-component';
import { VueComponent } from '@/ui/vue-ts-component';
//import Styles from './FormContainer.scss';
//import SharedStyles from '@/ui/styles/main.scss';

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
  name: 'FormContainer',
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
export class FormContainer extends VueComponent<IProps> {
  public id!: string;
  public maxLength?: number;
  public value!: string;
  public placeholder!: string;
  public errorMessages!: string[];
  public required!: boolean;

  public get currentLength(): number {
    return this.value.length;
  }

  public update(e: Event): void {
    const value = (e.target as HTMLTextAreaElement).value;
    this.$emit('change', { key: this.id, value });
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={``}>
        <label class={``}>
          {this.errorMessages.length > 0 && (
            <div class={``}>
              {this.errorMessages.map((error) => (
                <div class={``}>{error}</div>
              ))}
            </div>
          )}
          <textarea class={``} value={this.value} on-change={this.update.bind(this)} />
          <span class={``}>
            {this.currentLength} {this.maxLength ? `${this.currentLength} / ${this.maxLength} ` : ''}
          </span>
        </label>
      </div>
    );
  }
}
