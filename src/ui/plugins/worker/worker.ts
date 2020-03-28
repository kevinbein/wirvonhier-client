import { expose} from 'comlink';
import { db } from '@/services';

const worker = {
  db,
}

expose(worker);
