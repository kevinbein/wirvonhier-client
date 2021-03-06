import Component from 'vue-class-component';
import Styles from './wvhButton.scss';
import { RawLocation } from 'vue-router';
import { VueComponent } from '@/ui/typings/vue-ts-component';

interface IProps {
  class?: string;
  primary?: boolean;
  cancel?: boolean;
  width?: string;
  icon?: string;
  to?: RawLocation;
  large?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'on-click'?: (...args: any[]) => void;
}
@Component({
  name: 'wvh-button',
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: Object,
      default: null,
    },
  },
})
export class WVHButton extends VueComponent<IProps> {
  public primary: boolean | undefined;
  public cancel: boolean | undefined;
  public large: boolean | undefined;
  public disabled: boolean | undefined;
  public width: string | undefined;
  public icon: string | undefined;
  public to!: RawLocation;

  private onClick: Function | Function[] = (): void => {
    return;
  };

  public created(): void {
    if (this.$listeners.click !== undefined) {
      this.onClick = this.$listeners.click;
    }
  }

  // @ts-ignore: Declared variable is not read
  public render(h: CreateElement): Vue.VNode {
    return this.to ? (
      <router-link
        to={this.to}
        style={{ width: this.width }}
        class={`
          ${Styles['wvh-button__container']}
          ${this.primary ? Styles['wvh-button__container--primary'] : ''}
          ${this.cancel ? Styles['wvh-button__container--cancel'] : ''}
          ${this.large ? Styles['wvh-button__container--large'] : ''}
          ${this.disabled ? Styles['wvh-button__container--disabled'] : ''}`}
      >
        <div>
          {this.$slots.default}
          {this.icon && <v-icon class={Styles['icon']}>{this.icon}</v-icon>}
        </div>
      </router-link>
    ) : (
      <div
        onClick={this.onClick}
        style={{ width: this.width }}
        class={`
          ${Styles['wvh-button__container']}
          ${this.primary ? Styles['wvh-button__container--primary'] : ''}
          ${this.cancel ? Styles['wvh-button__container--cancel'] : ''}
          ${this.large ? Styles['wvh-button__container--large'] : ''}
          ${this.disabled ? Styles['wvh-button__container--disabled'] : ''}`}
      >
        <div>
          {this.$slots.default}
          {this.icon && <v-icon class={Styles['icon']}>{this.icon}</v-icon>}
        </div>
      </div>
    );
  }
}
