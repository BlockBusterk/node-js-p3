import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student.module';
import { ClassModule } from './modules/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
   StudentModule, ClassModule,
   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 54330,
    username: 'admin',
    password: 'admin',
    database: 'nest-postdb',
    autoLoadEntities: true, 
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
