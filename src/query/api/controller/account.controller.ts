import { Controller, OnModuleInit, Get, Body } from '@nestjs/common';

@Controller('/api/v1/lookup/account')
export class AccountController {
  @Get()
  public getAllAccounts(): any {
    console.log('get getAllAccounts', new Date());
  }
}
