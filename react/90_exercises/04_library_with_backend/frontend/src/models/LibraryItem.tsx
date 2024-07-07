export default class LibraryItem {
  constructor(
    public name: string,
    public author: string,
    public year: number,
    public loaned: boolean,
    public id: number
  ) {}
}
