import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './requestLocationToast.scss';

@Component({
  name: 'RequestLocationToast',
})
export class RequestLocationToast extends Vue {
  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['request-location-toast']}>
        <div>Dürfen wir die GPS Koordinaten deines Gerätes abfragen?</div>
        <div class={Styles['request-location-toast__buttons']}>
          <button class={Styles['request-location-toast__button']} on-click={() => this.$emit('granted')}>
            Ok
          </button>
          <button class={Styles['request-location-toast__button']} on-click={() => this.$emit('denied')}>
            Abbrechen
          </button>
        </div>
      </div>
    );
  }
}
