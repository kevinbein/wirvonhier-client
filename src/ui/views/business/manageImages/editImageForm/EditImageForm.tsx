import Component from 'vue-class-component';
import { Image, IImageUpdates } from '@/entities';
import { BusinessModule, FormModule } from '@/store';
import { WVHButton, FormInputField, FormTextArea, Loader } from '@/ui';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { IImageSizes, IImageSize } from '../manageImages.types';
import Styles from './editImageForm.scss';
import SharedStyles from 'styles';

interface IProps {
  imageSizes: IImageSizes;
}

@Component({
  name: 'EditImageForm',
  components: {
    WVHButton,
    FormInputField,
    FormTextArea,
  },
  props: {
    imageSizes: {
      type: Object,
      required: true,
    },
  },
})
export class EditImageForm extends VueComponent<IProps> {
  public businessModule = BusinessModule.context(this.$store);
  public formModule = FormModule.context(this.$store);
  public imageSizes!: IImageSizes;
  public isLoadingForSave = false;
  public isLoadingForDelete = false;
  public possibleErrors: { [key: string]: string } = {
    title: 'Bitte gib einen Titel ein.',
  };
  public formErrors: { [key: string]: string[] } = {
    title: [],
  };

  public get editedImage(): Image {
    return this.businessModule.state.currentlyEditedImage as Image;
  }

  public get formId(): string {
    return `edit-image_${this.editedImage._id}`;
  }

  public get formData(): IImageUpdates {
    return this.formModule.getters.getFormById(this.formId) || {};
  }

  public get imageSize(): IImageSize {
    return this.imageSizes[this.editedImage.imageType];
  }

  public get formValidation(): { [key: string]: boolean } {
    return {
      title: !!this.formData.title && this.formData.title.length > 0,
    };
  }
  public get isValid(): boolean {
    return Object.keys(this.formValidation).every((key) => this.formValidation[key]);
  }
  public mounted(): void {
    this.setInitialData();
  }

  public update<T extends keyof IImageUpdates>({ key, value }: { key: T; value: IImageUpdates[T] }): void {
    const data = { ...this.formData };
    data[key] = value;
    this.formModule.actions.update({ formId: this.formId, data });
    this.$forceUpdate();
  }

  public saveChanges(): void {
    this.isLoadingForSave = true;
    if (!this.isValid) {
      Object.keys(this.formValidation).forEach((key) => {
        if (this.formValidation[key]) this.formErrors[key] = [];
        else this.formErrors[key].push(this.possibleErrors[key]);
      });
      return;
    }
    this.businessModule.actions.updateImage({ imageId: this.editedImage._id, updates: this.formData });
    this.cancel();
    this.isLoadingForSave = false;
  }

  public cancel(): void {
    this.businessModule.actions.selectImageForEdit(null);
  }

  public async deleteImage(): Promise<void> {
    this.isLoadingForDelete = true;
    await this.businessModule.actions.deleteImage(this.editedImage._id);
    this.cancel();
    this.isLoadingForDelete = true;
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['edit-image-form']}>
        <h2 class={Styles['edit-image-form__title']}>Bild bearbeiten</h2>
        <cld-image
          class={Styles['edit-image-form__thumbnail']}
          publicId={this.editedImage.publicId}
          width={this.imageSize.width}
          height={this.imageSize.height}
          crop="fill"
          alt={this.editedImage.title}
          dpr={window.devicePixelRatio}
          fetchFormat="auto"
        >
          <cld-transformation width={this.imageSize.width} height={this.imageSize.height} crop="fill" />
        </cld-image>
        <FormInputField
          label="Titel"
          id="title"
          required={true}
          type="text"
          autofocus={true}
          autocomplete="off"
          is-valid={this.formValidation.title}
          error-messages={this.formErrors.title}
          value={this.formData.title || ''}
          on-change={this.update.bind(this)}
        />
        <FormTextArea
          label="Beschreibung"
          id="description"
          required={false}
          max-length={300}
          is-valid={true}
          value={this.formData.description || ''}
          on-change={this.update.bind(this)}
        />
        <div class={Styles['edit-image-form__buttons']}>
          <WVHButton
            disabled={!this.isValid}
            primary
            class={SharedStyles['submit']}
            on-click={this.saveChanges.bind(this)}
          >
            {this.isLoadingForSave ? <Loader color="#fff" size={32} /> : 'Änderungen speichern'}
          </WVHButton>
          <WVHButton cancel class={SharedStyles['cancel']} on-click={this.cancel.bind(this)}>
            Abbrechen
          </WVHButton>
          <WVHButton cancel class={Styles['edit-image-form__delete']} on-click={this.deleteImage.bind(this)}>
            {this.isLoadingForDelete ? <Loader color="#fff" size={20} /> : 'Bild löschen'}
          </WVHButton>
        </div>
      </div>
    );
  }

  private setInitialData(): void {
    const keys = ['title', 'description'] as Array<keyof Partial<IImageUpdates>>;
    keys.forEach((key) => this.update({ key, value: this.editedImage[key] as string }));
  }
}
