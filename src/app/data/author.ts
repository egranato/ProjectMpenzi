export class Author {
  image: string;
  welcome: string;
  body: string;
  constructor(authorObj) {
    this.image = authorObj.image || null;
    this.welcome = authorObj.welcome;
    this.body = authorObj.body;
  }
}
