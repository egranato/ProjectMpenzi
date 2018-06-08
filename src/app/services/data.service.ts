import { Injectable } from '@angular/core';
import { Post } from '../data/post';

@Injectable()
export class DataService {

  constructor() { }

  public sortPostsByDate(posts: Array<Post>): Array<Post> {
    if (posts) {
      return this.insertionSort(posts, 'date');
    } else {
      return [];
    }
  }

  private insertionSort(array: Array<any>, key: string): Array<any> {
    for (let i = 0; i < array.length; ++i) {
      const temp = array[i];
      let j = i - 1;
      while (j >= 0 && array[j][key] > temp[key]) {
        array[j + 1] = array[j];
        --j;
      }
      array[j + 1] = temp;
    }
    return array;
  }
}
