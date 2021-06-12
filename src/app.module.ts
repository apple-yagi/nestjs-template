import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from 'infrastructure/database/modules/database.module';
import { PostModule } from 'infrastructure/modules/post.module';
import { UserModule } from 'infrastructure/modules/user.module';
import { HealthController } from 'infrastructure/terminus';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    TerminusModule,
    UserModule,
    PostModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
