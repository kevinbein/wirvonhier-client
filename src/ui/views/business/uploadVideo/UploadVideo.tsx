import Vue from 'vue';
import Component from 'vue-class-component';
import { rootModule, BusinessModule } from '@/store';
import SharedStyles from 'styles';
import Styles from './uploadVideo.scss';
import { WVHImageInputField, FormInputField, FormTextArea, WVHButton, Loader } from '@/ui';

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

@Component({
  name: 'UploadVideo',
})
export class UploadVideo extends Vue {
  public rootStore = rootModule.context(this.$store);
  public businessModule = BusinessModule.context(this.$store);
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
  public formData = {
    src: '',
    file: null,
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

  public update(options: IFormInputs): void {
    const { key, value } = options;
    if (key === 'file' && value instanceof FileList) {
      //this.$set(this.formData, 'title', value[0].name);
      const dateTimeStr = new Date().toLocaleString();
      this.$set(this.formData, 'title', `Story - ${dateTimeStr}`);
      this.$set(this.formData, 'file', value[0]);
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
    const business = this.businessModule.state.selectedBusiness;
    if (!business || !business._id) {
      return;
    }
    const res = await this.$services.videos.upload(business, this.formData);
    // NOTE: uploading video also updates Video-ID in Business!
    // TODO: Decide how to handle the updateBusiness + upload Video logic!
    await this.$services.business.loadAndPersistBusiness(business._id);
    this.businessModule.actions.selectBusiness(business._id);
    this.isLoading = false;
    if (!res) return;
    this.$set(this, 'progress', res);
  }

  public cancel(): void {
    this.formData.src = '';
    this.formData.file = null;
    this.formData.title = '';
    this.formData.description = '';
  }

  // @ts-ignore: Declared variable is not read
  render(h): Vue.VNode {
    return (
      <main role="main" class={`${SharedStyles.page} ${Styles['upload-video__page']}`}>
        <router-link
          class={Styles['upload-video__back']}
          to={{ name: 'BusinessDashboard', query: this.$route.query }}
          title="zurück"
        >
          <img src="/assets/icons/icon_arrow-left-492.svg" alt="arrow-back" class={Styles['upload-video__back-icon']} />
        </router-link>
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
              {!this.isUploading && !this.isFinished ? (
                <div class={Styles['upload-video__form-buttons']}>
                  <WVHButton primary class={SharedStyles['submit']} on-click={this.submit.bind(this)}>
                    {this.isLoading ? <Loader color="#fff" size={24} /> : 'Speichern'}
                  </WVHButton>
                  <WVHButton cancel class={SharedStyles['cancel']} on-click={this.cancel.bind(this)}>
                    Abbrechen
                  </WVHButton>
                </div>
              ) : !this.isFinished ? (
                <div class={Styles['upload-video__form-buttons']}>
                  <div class={Styles['upload-video__progress']}>Bitte warten... {this.progressString}</div>
                </div>
              ) : (
                <div class={Styles['upload-video__form-buttons']}>
                  <div class={Styles['upload-video__progress']}>Upload komplett!</div>
                </div>
              )}
            </div>
          ) : (
            <div style="display: contents">
              <WVHImageInputField
                label="Video auswählen"
                class={Styles['upload-video__upload-video-button']}
                id="file"
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
