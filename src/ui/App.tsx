import Vue from 'vue';
import Component from 'vue-class-component';
import '@/ui/styles/global/index.scss';
import Styles from './App.scss';
//import { BusinessModule } from '@/store';
import { IBusinessData } from '@/entities';
import { CreateElement } from 'vue/types/umd';
// Check ui/styles/global for directly used classes

@Component({
  name: 'App',
})
export class App extends Vue {
  get businesses(): IBusinessData[] {
    return this.$store.state.Business.businesses;
  }

  get names(): string {
    return this.businesses ? this.businesses.map((b) => b.name).join(' ') : 'nothing found';
  }

  created(): void {
    // @ts-ignore: Declared variable is not read
    //const ctx = BusinessModule.context(this.$store);
    //ctx.actions.loadBusinesses();
  }

  // @ts-ignore: Declared variable is not read
  render(h: CreateElement): Vue.VNode {
    return (
      <v-app>
        <div class={Styles['wvh-app-container']}>
          <div class={Styles['wvh-app']}>
            <router-view></router-view>
          </div>
        </div>
      </v-app>
    );
  }
}
