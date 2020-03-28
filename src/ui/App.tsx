import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'App',
  render(h): Vue.VNode {
    return <div></div>;
  },
  created() {
    this.$db.businesses.contacts.put({ name: 'Some Business' })
  },
})
export class App extends Vue {}
