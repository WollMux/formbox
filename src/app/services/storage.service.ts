import { Injectable } from '@angular/core';
import { Pal } from '../storage/pal';

@Injectable()
export abstract class StorageService {
  abstract async reset(): Promise<void>;
  abstract async getPAL(): Promise<Pal[]>;
}
