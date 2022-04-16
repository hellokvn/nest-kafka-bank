export class BaseEvent {
  protected _id: string;
  protected _version: number;

  constructor(id?: string, version?: number) {
    if (id) {
      this._id = id;
    }

    if (version) {
      this._version = version;
    }
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get version(): number {
    return this._version;
  }

  public set version(value: number) {
    this._version = value;
  }
}
