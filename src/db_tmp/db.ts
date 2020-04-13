import { IHttpResponse } from '@/services';

export class DB {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadedProfile: any | null = null;
  private businessId: string | null = null;
  public loadProfile(businessId: string, forceReload?: boolean): IHttpResponse {
    if (businessId == this.businessId && !forceReload) {
      return this.loadedProfile;
    }
    const profile = {};
    // eslint-disable-next-line no-console
    console.log('DB: Loaded profile', profile);
    this.businessId = businessId;
    this.loadedProfile = profile;
    return profile;
  }
}

export const db = new DB();
