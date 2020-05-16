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

  public get business(): Business {
    return this.businessModule.state.selectedBusiness as Business;
  }

  public created(): void {
    this.appearanceModule.actions.setNavigationVisibility(true);
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <div class={`${SharedStyles.page} ${Styles['manage-profile__page']}`}>
        <router-link
          to={{ name: 'BusinessDashboard', query: this.$route.query }}
          title="zurück"
          class={Styles['manage-profile__back']}
        >
          <img
            src="/assets/icons/icon_arrow-left-492.svg"
            alt="arrow-back"
            class={Styles['manage-profile__back-icon']}
          />
        </router-link>
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

export default BusinessManageProfile;
