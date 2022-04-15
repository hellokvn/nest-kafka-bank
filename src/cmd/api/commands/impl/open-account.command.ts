import { v4 as uuidv4 } from 'uuid';
import { OpenAccountDto } from '../../dto/open-account.dto';

export class OpenAccountCommand {
  private _id: string;
  private _accountHolder: string;
  private _accountType: string;
  private _openingBalance: number;

  constructor(payload: OpenAccountDto) {
    this._id = uuidv4();
    this._accountHolder = payload.accountHolder;
    this._accountType = payload.accountType;
    this._openingBalance = payload.openingBalance;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get accountType(): string {
    return this._accountType;
  }

  public set accountType(value: string) {
    this._accountType = value;
  }

  public get accountHolder(): string {
    return this._accountHolder;
  }

  public set accountHolder(value: string) {
    this._accountHolder = value;
  }

  public get openingBalance(): number {
    return this._openingBalance;
  }

  public set openingBalance(value: number) {
    this._openingBalance = value;
  }
}
