import Component from 'vue-class-component';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { IImageSizes } from '../manageImages.types';
import { BusinessModule } from '@/store';
import Styles from './imageForms.scss';

const NewImageForm = (): any => import(/* webpackChunkName: "NewImageForm" */ '../newImageForm');
const EditImageForm = (): any => import(/* webpackChunkName: "EditImageForm" */ '../editImageForm');

interface IProps {
  imageSizes: IImageSizes;
}
@Component({
  name: 'ImageForms',
  props: {
    imageSizes: {
      type: Object,
      required: true,
    },
  },
  components: {
    NewImageForm,
    EditImageForm,
  },
})
export class ImageForms extends VueComponent<IProps> {
  public businessModule = BusinessModule.context(this.$store);
  public imageSizes!: IImageSizes;
  public isCreatingNewImage = false;

  public get isEditingImage(): boolean {
    return !!this.businessModule.state.currentlyEditedImage;
  }

  public toggleCreateNewImage(): void {
    this.isCreatingNewImage = !this.isCreatingNewImage;
  }

  public handleButtonClick(): void {
    if (this.isEditingImage) this.businessModule.actions.selectImageForEdit(null);
    else this.isCreatingNewImage = !this.isCreatingNewImage;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div
        class={`${Styles['image-forms']} ${
          this.isEditingImage || this.isCreatingNewImage ? Styles['image-forms--active'] : ''
        }`}
      >
        <div class={Styles['image-forms__overlay']} on-click={this.handleButtonClick.bind(this)} />
        <div class={Styles['image-forms__button']} on-click={this.handleButtonClick.bind(this)}>
          <i
            class={`fa fa-plus ${Styles['image-forms__icon']} ${
              this.isCreatingNewImage || this.isEditingImage ? Styles['image-forms__icon--close'] : ''
            }`}
          />
        </div>
        <div class={Styles['image-forms__container']}>
          {this.isCreatingNewImage && (
            <NewImageForm imageSizes={this.imageSizes} on-cancel-new-image={this.toggleCreateNewImage.bind(this)} />
          )}
          {this.isEditingImage && <EditImageForm imageSizes={this.imageSizes} />}
        </div>
      </div>
    );
  }
}
