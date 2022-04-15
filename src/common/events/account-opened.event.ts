import { OpenAccountCommand } from '@/cmd/api/commands/impl/open-account.command';

export class AccountOpenedEvent {
  private _accountHolder: string;
  private _accountType: string;
  private _openingBalance: number;
  private _createdDate: Date;

  constructor(command: OpenAccountCommand) {
    this._accountHolder = command.accountHolder;
    this._accountType = command.accountType;
    this._openingBalance = command.openingBalance;
    this._createdDate = new Date();
  }

  public get accountHolder(): string {
    return this._accountHolder;
  }

  public set accountHolder(value: string) {
    this._accountHolder = value;
  }

  public get accountType(): string {
    return this._accountType;
  }

  public set accountType(value: string) {
    this._accountType = value;
  }

  public get openingBalance(): number {
    return this._openingBalance;
  }

  public set openingBalance(value: number) {
    this._openingBalance = value;
  }

  public get createdDate(): Date {
    return this._createdDate;
  }

  public set createdDate(value: Date) {
    this._createdDate = value;
  }
}
