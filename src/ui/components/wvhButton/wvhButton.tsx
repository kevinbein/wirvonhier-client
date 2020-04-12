import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './wvhButton.scss';
import { RawLocation } from 'vue-router';

@Component({
  name: 'wvh-button',
  /*props: {
    primary: {
      default: 'something',
    },
  },*/
  // default is undefined and true if no value is given but the attribute
  // is defined
  props: ['primary', 'icon', 'to'],
})
export class WVHButton extends Vue {
  public primary: string | undefined;
  public icon: string | undefined;
  // router-link
  public to: RawLocation | undefined;

  private onClick: Function | Function[] = (): void => {
    return;
  };
  created(): void {
    if (this.$listeners.click !== undefined) {
      this.onClick = this.$listeners.click;
    } else if (this.to !== undefined) {
      this.onClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.$router.push(this.to!);
      };
    }
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    //console.log(this);
    return (
      <div
        onClick={this.onClick}
        class={Styles['wvh-button-container'] + ' ' + (this.primary ? Styles['primary'] : '')}
      >
        <div class={Styles['wvh-button']}>
          {this.$slots.default}
          {this.icon && <v-icon class={Styles['icon']}>{this.icon}</v-icon>}
        </div>
      </div>
    );
  }
}
