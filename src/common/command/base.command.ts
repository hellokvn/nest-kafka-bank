export class BaseCommand {
  protected _id: string;

  constructor(id?: string) {
    if (id) {
      this._id = id;
    }
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
