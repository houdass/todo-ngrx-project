export class Todo {
  constructor(public name: string, public id?: number) {
    if (!id) {
      this.id = this.randomId();
    }
  }

  randomId(): number {
    return Math.floor(Date.now() * Math.random());
  }
}
