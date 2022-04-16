import { BaseCommand } from '@/common/command/base.command';
import { DepositFundsDto } from '@/cmd/api/dto/deposit-funds.dto';

export class DepositFundCommand extends BaseCommand {
  private _amount: number;

  constructor(id: string, payload: DepositFundsDto) {
    super();

    this._id = id;
    this._amount = payload.amount;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(value: number) {
    this._amount = value;
  }
}
