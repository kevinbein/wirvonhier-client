import Component from 'vue-class-component';
import { IImageData, IMAGETYPE } from '@/entities';
import { BusinessModule, FormModule } from '@/store';
import { WVHButton, FormInputField, FormTextArea, WVHImageInputField, FormCheckbox, Loader } from '@/ui';
import { VueComponent } from '@/ui/typings/vue-ts-component';
import { IImageSizes, IImageSize } from '../manageImages.types';
import Styles from './newImageForm.scss';
import SharedStyles from 'styles';
import { POSITION, TYPE } from 'vue-toastification';

interface IProps {
  imageSizes: IImageSizes;
}

@Component({
  name: 'NewImageForm',
  components: {
    FormInputField,
    FormTextArea,
    FormCheckbox,
    WVHButton,
    WVHImageInputField,
  },
  props: {
    imageSizes: {
      type: Object,
      required: true,
    },
  },
})
export class NewImageForm extends VueComponent<IProps> {
  public businessModule = BusinessModule.context(this.$store);
  public formModule = FormModule.context(this.$store);
  public isLoading = false;
  public imageSizes!: IImageSizes;
  public possibleErrors: { [key: string]: string } = {
    title: 'Bitte gib einen Titel ein.',
    imageFile: 'Bitte wähle eine Datei aus.',
  };
  public formErrors: { [key: string]: string[] } = {
    title: [],
    imageFile: [],
  };

  public get formId(): string {
    return `new-image`;
  }

  public imageFile: string | null = null;
  public get formData(): Omit<IImageData, 'publicId'> {
    return this.formModule.getters.getFormById(this.formId) || {};
  }

  public get imageSize(): IImageSize {
    return this.imageSizes[this.formData.imageType];
  }

  public get formValidation(): { [key: string]: boolean } {
    return {
      title: !!this.formData.title && this.formData.title.length > 0,
      imageFile: !!this.imageFile,
    };
  }
  public get isValid(): boolean {
    return Object.keys(this.formValidation).every((key) => this.formValidation[key]);
  }
  public mounted(): void {
    this.setInitialData();
  }

  public update<T extends keyof Omit<IImageData, 'publicId'>>({ key, value }: { key: T; value: IImageData[T] }): void {
    const data = { ...this.formData };
    data[key] = value;
    this.formModule.actions.update({ formId: this.formId, data });
  }

  public updateImageType({ key }: { key: IMAGETYPE }): void {
    const data = { ...this.formData };
    data.imageType = key;
    this.formModule.actions.update({ formId: this.formId, data });
  }

  public handleNewImage({ value }: { value: FileList }): void {
    this.update({
      key: 'title',
      value: value[0].name
        .split('.')
        .slice(0, -1)
        .join(''),
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageFile = reader.result as string;
    };
    reader.readAsDataURL(value[0]);
  }

  public async saveChanges(): Promise<void> {
    this.isLoading = true;
    if (!this.isValid) {
      Object.keys(this.formValidation).forEach((key) => {
        if (this.formValidation[key]) this.formErrors[key] = [];
        else this.formErrors[key].push(this.possibleErrors[key]);
      });
      return;
    }
    try {
      await this.businessModule.actions.saveNewImage({
        newImageData: this.formData,
        imageFile: this.imageFile as string,
      });
      this.$toast('Bild erfolgreich gespeichert.', { position: POSITION.TOP_CENTER, type: TYPE.SUCCESS });
      this.$emit('cancel-new-image');
      this.isLoading = false;
    } catch (e) {
      this.$toast(`Oops! Speichern gescheitert. ${e}`, { position: POSITION.TOP_CENTER, type: TYPE.ERROR });
      this.isLoading = false;
    }
  }

  public cancel(): void {
    this.$emit('cancel-new-image');
  }

  // @ts-ignore
  public render(h): Vue.VNode {
    return (
      <div class={Styles['new-image-form']}>
        <h2 class={Styles['new-image-form__title']}>Neues Bild</h2>
        <WVHImageInputField
          label="Bild auswählen"
          class={Styles['new-image-form__upload-image-button']}
          id="file"
          accept="image/png, image/jpeg, image/gif"
          is-valid={this.formValidation.image}
          error-messages={this.formErrors.image}
          on-change={this.handleNewImage.bind(this)}
        />
        {this.imageFile && (
          <img
            class={Styles['new-image-form__preview']}
            style={{ width: `${this.imageSize.width}px`, height: `${this.imageSize.height}px` }}
            src={this.imageFile}
            alt={this.formData.title}
          />
        )}
        <div class={Styles['form-hints__wrapper']}>
          <h3 class={`${SharedStyles['text--primary']} ${Styles['form-hints__title']}`}>Achte bitte auf folgendes:</h3>
          <div class={Styles['form-hints__hint']}>
            <b>Cover-Bilder</b>
            <span>Format: 16:9</span>
            <span>Auflösung: 1000x900 Pixel</span>
          </div>
          <div class={Styles['form-hints__hint']}>
            <b>Story-Bilder</b>
            <span>Format: 9:16</span>
            <span>Auflösung: 1000x1600 Pixel</span>
          </div>
        </div>

        <FormInputField
          label="Titel"
          id="title"
          required={true}
          type="text"
          autofocus={true}
          autocomplete="off"
          is-valid={this.formValidation.title}
          error-messages={this.formErrors.title}
          value={this.formData.title}
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
        <FormCheckbox
          id={IMAGETYPE.STORY}
          label="Als Story auswählen"
          value={IMAGETYPE.STORY}
          currentValue={this.formData.imageType}
          is-Valid={true}
          error-messages={[]}
          on-change={this.updateImageType.bind(this)}
        />
        <FormCheckbox
          id={IMAGETYPE.PROFILE}
          label="Als Cover-Bild auswählen"
          value={IMAGETYPE.PROFILE}
          currentValue={this.formData.imageType}
          is-Valid={true}
          error-messages={[]}
          on-change={this.updateImageType.bind(this)}
        />
        <FormCheckbox
          id={IMAGETYPE.LOGO}
          label="Als Logo auswählen"
          value={IMAGETYPE.LOGO}
          currentValue={this.formData.imageType}
          is-Valid={true}
          error-messages={[]}
          on-change={this.updateImageType.bind(this)}
        />
        <div class={Styles['new-image-form__buttons']}>
          <WVHButton
            disabled={!this.isValid}
            primary
            class={SharedStyles['submit']}
            on-click={this.saveChanges.bind(this)}
          >
            {this.isLoading ? ['', <Loader color="#fff" size={32} />] : 'Bild speichern'}
          </WVHButton>
          <WVHButton cancel class={SharedStyles['cancel']} on-click={this.cancel.bind(this)}>
            Abbrechen
          </WVHButton>
        </div>
      </div>
    );
  }

  private setInitialData(): void {
    this.update({ key: 'imageType', value: IMAGETYPE.STORY });
  }
}
