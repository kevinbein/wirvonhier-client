import Component from 'vue-class-component';
import Vue from 'vue/types/umd';
import { rootModule, BusinessModule } from '@/store';
import { VueComponent } from '@/ui/vue-ts-component';
import Styles from './manageImagesForm.scss';
import SharedStyles from '@/ui/styles/main.scss';
import { WVHButton, WVHTextField, WVHTextareaField, WVHImageInputField, WVHCheckboxField } from '@/ui';
import { IImageData } from '../manageImages.types';
import { MEDIATYPE, Business } from '@/entities';

interface IRefs {
  [key: string]: Vue | Element | HTMLElement | Vue[] | Element[] | HTMLElement[];
  title: Vue;
  description: Vue;
}

interface IProps {
  'on-new-image': (data: IImageData) => void;
  coverWidth: number;
  coverHeight: number;
  storyWidth: number;
  storyHeight: number;
  image: IImageData | null;
}

interface IErrors {
  title: string[];
  image: string[];
  description: string[];
}

type K = Extract<keyof IImageData, string>;

type IFormInputs = ITitle | IDesc | IFile;
interface ITitle {
  key: 'title';
  value: string;
}
interface IDesc {
  key: 'description';
  value: string;
}
interface IFile {
  key: 'file';
  value: FileList;
}

const initialFormData: IImageData = {
  _id: '',
  createdAt: '',
  modifiedAt: '',
  title: '',
  publicId: '',
  src: '',
  description: '',
  isCover: false,
  saved: false,
  markedForDelete: false,
  type: MEDIATYPE.IMAGE,
};

@Component({
  name: 'ManageImagesForm',
  props: {
    coverHeight: {
      type: Number,
      default: 0,
    },
    coverWidth: {
      type: Number,
      default: 0,
    },
    storyHeight: {
      type: Number,
      default: 0,
    },
    storyWidth: {
      type: Number,
      default: 0,
    },
    image: {
      type: Object,
      default: () => null,
    },
  },
  watch: {
    image: {
      deep: true,
      handler(this: ManageImagesForm, newImage: IImageData) {
        if (!newImage) return;
        this.formData = { ...initialFormData };
        this.formData = { ...newImage };
      },
    },
  },
})
export class ManageImagesForm extends VueComponent<IProps, IRefs> {
  public rootStore = rootModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  public coverWidth!: number;
  public coverHeight!: number;
  public storyWidth!: number;
  public storyHeight!: number;
  public image: IImageData | null = null;
  public formErrors: IErrors = {
    title: [],
    description: [],
    image: [],
  };
  public formValidation = {
    image: false,
    title: false,
    description: false,
  };
  private formData: IImageData = { ...initialFormData };

  public get business(): Business | null {
    return this.businessModule.state.selectedBusiness;
  }

  public get previewHeight(): number {
    return this.formData.isCover ? this.coverHeight : this.storyHeight;
  }
  public get previewWidth(): number {
    return this.formData.isCover ? this.coverWidth : this.storyWidth;
  }

  public get isImageSelected(): boolean {
    const { src, publicId } = this.formData;
    return !!src || !!publicId;
  }

  public addImage(e: Event): void {
    e.preventDefault();
    if (!this.business) return;
    this.formErrors.title = this.formData.title.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    this.formErrors.description =
      this.formData.description && this.formData.description.length === 0 ? ['Feld darf nicht leer sein.'] : [];
    if (this.formErrors.title.length > 0 || this.formErrors.description.length > 0) return;

    const data: IImageData = {
      _id: this.formData._id,
      createdAt: new Date(Date.now()).toUTCString(),
      modifiedAt: new Date(Date.now()).toUTCString(),
      title: this.formData.title,
      src: this.formData.src,
      isCover: this.formData.isCover,
      description: this.formData.description,
      saved: this.formData.saved,
      markedForDelete: false,
      publicId: this.formData.publicId || this.business.generateImagePublicId(this.formData),
      type: MEDIATYPE.IMAGE,
    };
    this.$emit('new-image', data);

    for (const key in initialFormData) {
      this.$set(this.formData, key, initialFormData[key as K]);
    }
  }

  public cancel(e: Event): void {
    e.preventDefault();
    for (const key in initialFormData) {
      this.$set(this.formData, key, initialFormData[key as K]);
    }
    this.$emit('canel');
  }

  public update(options: IFormInputs): void {
    const { key, value } = options;
    if (key === 'file' && value instanceof FileList) {
      this.$set(this.formData, 'title', value[0].name);
      const reader = new FileReader();
      reader.onload = () => {
        this.$set(this.formData, 'src', reader.result);
      };
      reader.readAsDataURL(value[0]);
    } else {
      this.$set(this.formData, key, value);
    }
  }

  // @ts-ignore: Declared variable is not read
  public render(h): Vue.VNode {
    return (
      <form class={Styles['manage-images__form']}>
        {this.isImageSelected ? (
          <div style="display: contents">
            <WVHTextField
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
            <WVHTextareaField
              label="Beschreibung"
              id="description"
              required={false}
              max-length={300}
              is-valid={this.formValidation.description}
              error-messages={this.formErrors.description}
              value={this.formData.description || ''}
              on-change={this.update.bind(this)}
            />
            <WVHCheckboxField
              id="isCover"
              label="Als Cover-Bild auswählen"
              value={this.formData.isCover}
              is-Valid={true}
              error-messages={[]}
              on-change={this.update.bind(this)}
            />
            {this.formData.src ? (
              <img
                class={Styles['manage-images__form-preview']}
                width={this.previewWidth}
                height={this.previewHeight}
                src={this.formData.src}
                alt={this.formData.title}
              />
            ) : (
              <cld-image
                class={Styles['manage-images__form-preview']}
                publicId={this.formData.publicId}
                width={this.previewWidth}
                height={this.previewHeight}
                crop="scale"
                alt={this.formData.title}
                dpr={window.devicePixelRatio}
                fetchFormat="auto"
              >
                <cld-transformation width={this.previewWidth} height={this.previewHeight} crop="scale" />
              </cld-image>
            )}
            <WVHButton primary class={SharedStyles['submit']} on-click={this.addImage.bind(this)}>
              Bestätigen
            </WVHButton>
            <WVHButton cancel class={SharedStyles['cancel']} on-click={this.cancel.bind(this)}>
              Abbrechen
            </WVHButton>
          </div>
        ) : (
          <div style="display: contents">
            <WVHImageInputField
              label="Bild hinzufügen"
              class={Styles['manage-images__upload-image-button']}
              id="file"
              accept="image/png, image/jpeg, image/gif"
              is-valid={this.formValidation.image}
              error-messages={this.formErrors.image}
              on-change={this.update.bind(this)}
            />
            <div class={Styles['form-hints__wrapper']}>
              <h3 class={`${SharedStyles['text--primary']} ${Styles['form-hints__title']}`}>
                Achte bitte auf folgendes:
              </h3>
              <div class={Styles['form-hints__left']}>
                <b>Cover-Bilder</b>
                <span>Format: 16:9</span>
                <span>Auflösung: 1000x900 Pixel</span>
              </div>
              <div class={Styles['form-hints__right']}>
                <b>Story-Bilder</b>
                <span>Format: 9:16</span>
                <span>Auflösung: 1000x1600 Pixel</span>
              </div>
            </div>
          </div>
        )}
      </form>
    );
  }
}

export default ManageImagesForm;
