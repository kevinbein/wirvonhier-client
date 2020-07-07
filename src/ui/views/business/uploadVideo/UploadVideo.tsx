import Vue from 'vue';
import Component from 'vue-class-component';
import { rootModule, BusinessModule, UserModule } from '@/store';
import SharedStyles from 'styles';
import Styles from './uploadVideo.scss';
import { WVHImageInputField, FormInputField, FormTextArea, WVHButton, Loader, BackButton } from '@/ui';
import { Business } from '@/entities';
import { POSITION, TYPE } from 'vue-toastification';

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
  key: 'videoFile';
  value: FileList;
}

interface IFormData {
  title: string;
  description: string;
  src: string;
  videoFile: null | File;
}
@Component({
  name: 'UploadVideo',
  components: {
    BackButton,
  },
  watch: {
    isFinished: {
      async handler(this: UploadVideo, isFinished) {
        if (isFinished && this.business) {
          await this.$services.business.loadAndPersistBusiness(this.business._id);
          this.userModule.actions.selectBusiness(this.business._id);
          this.$toast('Video erfolgreich hochgeladen.', {
            position: POSITION.TOP_CENTER,
            type: TYPE.SUCCESS,
          });
          setTimeout(() => {
            this.formData.src = '';
            this.formData.title = '';
            this.formData.description = '';
            this.formData.videoFile = null;
            this.isLoading = false;
          }, 2000);
        }
      },
    },
  },
})
export class UploadVideo extends Vue {
  public rootStore = rootModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
  public userModule = UserModule.context(this.$store);
  public isLoading = false;
  public formValidation = {
    video: true,
    title: true,
    description: true,
  };
  public formErrors = {
    video: [],
    title: [],
    description: [],
  };
  public formData: IFormData = {
    src: '',
    videoFile: null,
    title: '',
    description: '',
  };
  public progress = {
    value: 0,
  };
  public get isVideoSelected(): boolean {
    const { src } = this.formData;
    return !!src;
  }

  public get isUploading(): boolean {
    return this.progress.value > 0 && this.progress.value < 1;
  }

  public get isFinished(): boolean {
    return this.progress.value === 1;
  }

  public get progressString(): string {
    return `${Math.round(this.progress.value * 100)}%`;
  }

  public get business(): Business | null {
    return this.userModule.state.selectedBusiness;
  }

  public update(options: IFormInputs): void {
    const { key, value } = options;
    if (key === 'videoFile' && value instanceof FileList) {
      //this.$set(this.formData, 'title', value[0].name);
      const dateTimeStr = new Date().toLocaleString();
      this.$set(this.formData, 'title', `Story - ${dateTimeStr}`);
      this.$set(this.formData, 'videoFile', value[0]);
      const reader = new FileReader();
      reader.onload = () => {
        this.$set(this.formData, 'src', reader.result);
      };
      reader.readAsDataURL(value[0]);
    } else {
      this.$set(this.formData, key, value);
    }
  }

  public async submit(): Promise<void> {
    this.isLoading = true;
    if (!this.business) {
      return;
    }
    if (!this.formData.videoFile) return;
    const newVideoData = {
      ...this.formData,
      videoFile: this.formData.videoFile,
      businessId: this.business._id,
    };
    const res = await this.businessModule.actions.saveNewVideo(newVideoData);
    if (!res) {
      this.isLoading = false;
      return;
    }
    this.$set(this, 'progress', res);
  }

  public cancel(): void {
    this.formData.src = '';
    this.formData.videoFile = null;
    this.formData.title = '';
    this.formData.description = '';
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <main role="main" class={`${SharedStyles.page} ${Styles['upload-video__page']}`}>
        <BackButton />
        <h1 class={Styles['upload-video__title']}>VIDEO HOCHLADEN</h1>
        <form class={Styles['upload-video__form']}>
          {this.isVideoSelected ? (
            <div style="display: contents">
              <video autoplay={false} src={this.formData.src} controls={true} class={Styles['upload-video__preview']} />
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
                is-valid={this.formValidation.description}
                error-messages={this.formErrors.description}
                value={this.formData.description || ''}
                on-change={this.update.bind(this)}
              />
              {this.isLoading ? (
                <div class={Styles['upload-video__form-buttons']}>
                  <WVHButton disabled primary class={SharedStyles['submit']} on-click={this.submit.bind(this)}>
                    {this.isUploading && [
                      <div
                        class={`${Styles['upload-button-background']} ${Styles['upload-button-background--in-progress']}`}
                        style={{ transform: `scaleX(${this.progress.value})` }}
                      />,
                      this.progressString,
                    ]}
                    {this.isFinished && [
                      <div
                        class={`${Styles['upload-button-background']} ${Styles['upload-button-background--success']}`}
                      />,
                      'Fertig!',
                    ]}
                    {!this.isUploading && !this.isFinished && <Loader color="#fff" size={24} />}
                  </WVHButton>
                </div>
              ) : (
                <div class={Styles['upload-video__form-buttons']}>
                  <WVHButton primary class={SharedStyles['submit']} on-click={this.submit.bind(this)}>
                    Speichern
                  </WVHButton>
                  <WVHButton cancel class={SharedStyles['cancel']} on-click={this.cancel.bind(this)}>
                    Abbrechen
                  </WVHButton>
                </div>
              )}
            </div>
          ) : (
            <div style="display: contents">
              <WVHImageInputField
                label="Video auswählen"
                class={Styles['upload-video__upload-video-button']}
                id="videoFile"
                accept="video/*"
                is-valid={this.formValidation.video}
                error-messages={this.formErrors.video}
                on-change={this.update.bind(this)}
              />
              <div class={Styles['form-hints__wrapper']}>
                <h3 class={`${SharedStyles['text--primary']} ${Styles['form-hints__title']}`}>
                  Achte bitte auf folgendes:
                </h3>
                <span>
                  <b>Format:</b> 16:9 (hochkant)
                </span>
                <span>
                  <b>Länge:</b> max. 20 Sekunden
                </span>
                <br />
                <span>
                  <b>
                    Das Video wird nach dem Upload zuerst von unseren Servern verarbeitet. Es kann daher bis zu 1 Stunde
                    dauern, bis das Video als Story den Nutzern angezeigt wird!
                  </b>
                </span>
              </div>
            </div>
          )}
        </form>
      </main>
    );
  }
}
