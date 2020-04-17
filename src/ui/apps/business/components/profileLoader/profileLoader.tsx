import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './profileLoader.scss';
import { WVHButton } from '@/ui/components';
//import { db } from '@/db_tmp';
import { BusinessModule } from '@/store';

@Component({
  name: 'ProfileLoader',
  props: ['businessId'],
})
export class ProfileLoader extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | unknown | null = null;
  public loadingFailed = false;
  public businessId: string | undefined;
  //public rootStore = rootModule.context(this.$store);

  public async loadProfile(): Promise<void> {
    this.loadingFailed = false;
    this.profile = null;
    const fixedProfileId = 'WeingutWalz';
    const businessStore = BusinessModule.context(this.$store);
    const ret = await businessStore.actions.loadBusiness(fixedProfileId);
    if (ret.status === 'failure') {
      this.loadingFailed = true;
      // eslint-disable-next-line no-console
      console.log('caught error', ret.message, ret.data);
      return;
    }
    this.profile = ret.data.business;
    this.$emit('loadedProfile', this.profile);
  }

  logout(): void {
    this.$router.push('/business');
  }

  mounted(): void {
    // @ts-ignore
    this.$refs.logoutButton.addEventListener('click', () => {
      this.logout();
    });
  }

  constructor() {
    super();
    this.loadProfile();
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    if (this.profile != null) {
      // @ts-ignore Missing undefined error blah, again ... It is defined, it always is if included as component
      //return this.$slots.default;
      return <div>{this.$slots.default}</div>;
    }
    return (
      <div class={Styles['loading-error-container']}>
        <div ref="logoutButton" class={Styles['close-button']}>
          <v-icon class={Styles['icon']}>fa-sign-out-alt</v-icon>
        </div>
        <div class={Styles['loading-error']}>
          <div class={Styles['message']}>
            Loading profile &nbsp;
            {(this.loadingFailed && (
              <span>
                ... <span class={Styles['error']}>failed!</span>
              </span>
            )) || <v-icon class={Styles['icon']}>fas fa-spinner fa-spin</v-icon>}
          </div>
          {this.loadingFailed && (
            <WVHButton icon="fa-redo" onClick={() => this.loadProfile()} class={Styles['retry']}>
              Reload
            </WVHButton>
          )}
        </div>
      </div>
    );
  }
}
