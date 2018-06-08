export class Post {
  title: string;
  body: string;
  date: Date;
  place: string;
  image: string;
  constructor(
    post: any
  ) {
    this.title = post.title;
    this.body = post.body;
    this.date = new Date(post.date);
    this.place = post.place || null;
    this.image = post.image || null;
  }
}
