import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../domain/repository/account.repository';
import { AllAccountsQuery } from '../impl/all-accounts.query';
import { QUERY_DATABASE_CONNECTION } from '../../../../common/constants/database.constants';

@QueryHandler(AllAccountsQuery)
export class AllAccountsHandler implements IQueryHandler<AllAccountsQuery> {
  @InjectRepository(AccountRepository, QUERY_DATABASE_CONNECTION)
  private repository: AccountRepository;

  public async execute(query: AllAccountsQuery) {
    return this.repository.find();
  }
}
