import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './manageProfile.scss';
import SharedStyles from 'styles';
import { BusinessModule, UserDataState, UserModule, AppearanceModule } from '@/store';
import { Business } from '@/entities';
import { ManageProfileForm } from './manageProfileForm';
import { Loader, WVHButton, BackButton } from '@/ui/components';

@Component({
  name: 'ManageProfile',
  components: {
    BackButton,
  },
})
export class ManageProfile extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get business(): Business | null {
    return this.user.selectedBusiness;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['manage-profile__page']}`}>
        <BackButton to={{ name: 'BusinessDashboard', query: this.$route.query }} />
        <div class={Styles['manage-profile__form-wrapper']}>
          {this.business ? (
            <div style="display: contents">
              <div class={Styles['manage-profile__title']}>{this.business.name}</div>
              <div class={Styles['manage-profile__button-images']}>
                <WVHButton to={{ name: 'BusinessManageImages', query: this.$route.query }} primary>
                  Bilder verwalten
                </WVHButton>
              </div>
              <ManageProfileForm />
            </div>
          ) : (
            <Loader size={64} />
          )}
        </div>
      </div>
    );
  }
}
