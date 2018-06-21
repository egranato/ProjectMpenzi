export class Author {
  image: string;
  welcome: string;
  body: string;
  constructor(authorObj?: any) {
    if (authorObj) {
      this.image = authorObj.image || null;
      this.welcome = authorObj.welcome || '';
      this.body = authorObj.body || '';
    } else {
      this.image = null;
      this.welcome = '';
      this.body = '';
    }
  }
}
