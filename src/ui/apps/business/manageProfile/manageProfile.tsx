import Vue from 'vue';
import Component from 'vue-class-component';
import Styles from './manageProfile.scss';
import { BusinessModule, UserDataState, UserModule, AppearanceModule } from '@/store';
import { Business } from '@/entities';
import { ManageProfileForm } from './manageProfileForm';
import { Loader } from '@/ui/components';

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
      <div class={`${Styles.page} ${Styles['manage-profile__page']}`}>
        <router-link to={{ name: 'BusinessDashboard' }} title="zurück" class={Styles['manage-profile__back']}>
          zurück
        </router-link>
        <div class={Styles['manage-profile__title']}>PROFIL VERWALTEN</div>
        <div class={Styles['manage-profile__form-wrapper']}>
          {this.business ? <ManageProfileForm /> : <Loader size={64} />}
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
      return;
    }

    // CASE_3: Create new business
    if (!businessId) return this.initBusiness();
  }

  private initBusiness(): void {
    this.businessModule.actions.create();
  }
}

export default BusinessManageProfile;
