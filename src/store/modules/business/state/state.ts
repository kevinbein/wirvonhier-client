import { IBusinessFilter, Business, Image, Video } from '@/entities';

export class BusinessState {
  filters: IBusinessFilter[] = [];
  page = 0;
  lastPage = Infinity;
  limit = 5;
  businesses: Business[] = [];
  selectedBusiness: Business | null = null;
  currentlyEditedImage: Image | null = null;
  filteredSlides: Map<string, (Image | Video)[]> = new Map();
  currentExplorerIndex = 0;
}
