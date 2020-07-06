import Vue from 'vue';
import Component from 'vue-class-component';
import { WVHButton, BackButton } from '@/ui';
import Styles from './noBusinessesFound.scss';
import SharedStyles from 'styles';

@Component({
  name: 'NoBusinessesFound',
  components: {
    WVHButton,
  },
})
export class NoBusinessesFound extends Vue {
  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['no-businesses-found']}>
        <BackButton to={{ name: 'Landing' }} />
        <p class={Styles['no-businesses-found__text']}>In dieser Region haben sich noch keine Läden registriert! :(</p>
        <p class={Styles['no-businesses-found__text']}>
          Sieh dich stattdessen doch in einer bereits aktiven Region um:
        </p>
        <WVHButton
          class={`${Styles['no-businesses-found__link']} ${SharedStyles['link']}`}
          to={{ name: 'Explore', query: { zip: '71665' } }}
        >
          71665 - Vaihingen/Enz
        </WVHButton>
        <p class={Styles['no-businesses-found__text']}>
          Du möchtest deinen eigenen Laden hier listen? Toll! Hier gehts zum
        </p>
        <WVHButton
          class={`${Styles['no-businesses-found__link']} ${SharedStyles['link']}`}
          to={{ name: 'BusinessRegister' }}
        >
          Händlerportal
        </WVHButton>
      </div>
    );
  }
}
