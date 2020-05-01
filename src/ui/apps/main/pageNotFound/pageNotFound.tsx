import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export class PageNotFound extends Vue {
  // @ts-ignore
  public render(h): Vue.VNode {
    return <div>Page Not Found</div>;
  }
}

export default PageNotFound;
