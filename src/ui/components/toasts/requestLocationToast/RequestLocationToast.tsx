import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './requestLocationToast.scss';

@Component({
  name: 'RequestLocationToast',
})
export class RequestLocationToast extends Vue {
  public grantAccess(): void {
    this.$emit('granted');
    this.$emit('close-toast');
  }
  public denyAccess(): void {
    this.$emit('denied');
    this.$emit('close-toast');
  }
  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['request-location-toast']}>
        <div>Dürfen wir die GPS Koordinaten deines Gerätes abfragen?</div>
        <div class={Styles['request-location-toast__buttons']}>
          <button class={Styles['request-location-toast__button']} on-click={this.grantAccess.bind(this)}>
            Ok
          </button>
          <button class={Styles['request-location-toast__button']} on-click={this.denyAccess.bind(this)}>
            Abbrechen
          </button>
        </div>
      </div>
    );
  }
}
