import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student.module';
import { ClassModule } from './modules/class.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StudentModule, ClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
