import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './profileLoader.scss';
import { WVHButton } from '@/ui/components';
import { db } from '@/db_tmp';

@Component({
  name: 'ProfileLoader',
  props: ['businessId'],
})
export class ProfileLoader extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public profile: any | unknown | null = null;
  public loadingFailed = false;
  public businessId: string | undefined;

  public async loadProfile(): Promise<void> {
    this.loadingFailed = false;
    this.profile = null;
    try {
      const fixedProfile = 'WeingutWalz';
      this.profile = await db.loadProfile(fixedProfile);
      this.$emit('loadedProfile', this.profile);
    } catch (e) {
      this.loadingFailed = true;
    }
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
