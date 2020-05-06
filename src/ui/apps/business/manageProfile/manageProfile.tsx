import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './manageProfile.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { BusinessModule, UserDataState, UserModule, AppearanceModule } from '@/store';
import { Business } from '@/entities';
import { ManageProfileForm } from './manageProfileForm';
import { Loader, WVHButton } from '@/ui/components';

@Component({
  name: 'BusinessManageProfile',
})
export class BusinessManageProfile extends Vue {
  public appearanceModule = AppearanceModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get user(): UserDataState {
    return this.userModule.state;
  }

  public get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
    this.loadCorrectBusiness();
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['manage-profile__page']}`}>
        {/*<router-link to={{ name: 'BusinessDashboard' }} title="zurück" class={Styles['manage-profile__back']}>
          Zurück
        </router-link>*/}
        <div class={Styles['manage-profile__business-name']}>{this.business?.name}</div>
        <div class={Styles['manage-profile__form-wrapper']}>
          <div class={Styles['manage-profile__title']}>PROFIL VERWALTEN</div>
          {this.business ? (
            <div style="display: contents">
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

  private loadCorrectBusiness(): void {
    const businessId = this.$route.query.selected;

    // CASE_1: Edit active business
    if (this.business && this.business.id === businessId) return;

    // CASE_2: Business exists + User owns business, load it
    if (typeof businessId === 'string' && this.user.businesses.includes(businessId)) {
      this.businessModule.actions.selectBusiness(businessId);
    }
  }
}

export default BusinessManageProfile;
