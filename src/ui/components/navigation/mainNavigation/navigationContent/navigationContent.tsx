import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import Styles from './navigationContent.scss';
import { Location } from 'vue-router';
import { rootModule, UserModule } from '@/store';

interface ILink {
  to?: Location;
  action?: () => void;
  name: string;
  type?: string;
}
@Component
export class NavigationContent extends VueComponent<{}> {
  public rootModule = rootModule.context(this.$store);
  public userModule = UserModule.context(this.$store);

  public get userId(): string | null {
    return this.userModule.state.id;
  }

  public get logoutLogin(): ILink {
    return this.userId
      ? {
          to: { name: 'BusinessLogout' },
          name: 'Ausloggen',
          type: 'logout',
        }
      : {
          to: { name: 'BusinessLogin' },
          name: 'Login',
        };
  }

  public get links(): ILink[] {
    return [
      {
        to: { name: 'BusinessDashboard' },
        name: 'Händler - Startseite',
      },
      {
        to: { name: 'Landing' },
        name: 'Nutzer - Startseite',
      },
      {
        to: { name: 'Privacy' },
        name: 'Datenschutz',
      },
      {
        to: { name: 'Impressum' },
        name: 'Impressum',
      },
      {
        to: { name: 'Nutzungsbedingungen' },
        name: 'Nutzungsbedingungen',
      },
      this.logoutLogin,
    ];
  }

  public navigate(link: ILink): void {
    this.$emit('close');
    if (link.to && this.$route.name !== link.to.name) {
      this.$router.push(link.to);
    }
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <ul class={Styles['navigation-content']}>
        {this.links.map((link) => (
          <li
            class={`${Styles['navigation-content__item']} ${
              link.type === 'logout' ? Styles['navigation-content__item--logout'] : ''
            }`}
            on-click={() => this.navigate.call(this, link)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    );
  }
}
