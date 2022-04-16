import { Module } from '@nestjs/common';
import { QueryModule } from './query/query.module';
import { CmdModule } from './cmd/cmd.module';

@Module({
  imports: [CmdModule],
})
export class AppModule {}
