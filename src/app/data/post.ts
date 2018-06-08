export class Post {
  id: number;
  title: string;
  body: string;
  date: Date;
  place: string;
  image: string;
  constructor(
    post: any
  ) {
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;
    this.date = new Date(post.date);
    this.place = post.place || null;
    this.image = post.image || null;
  }
}
