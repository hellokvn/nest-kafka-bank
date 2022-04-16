import { OpenAccountCommand } from '@/cmd/api/commands/impl/open-account.command';
import { BaseEvent } from './base.event';
import { DepositFundCommand } from '../../cmd/api/commands/impl/deposit-funds.command';

export class FundsDepositedEvent extends BaseEvent {
  private _amount: number;

  constructor(command: DepositFundCommand) {
    super();
    this._amount = command.amount;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(value: number) {
    this._amount = value;
  }
}
