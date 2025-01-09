import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/guards/role.guard";
import { ClassController } from "src/controllers/class/class.controller";
import { Class } from "src/entities/class.entity";
import { Student } from "src/entities/student.entity";
import { ClassResolver } from "src/graphql/resolvers/class.resolver";
import { ClassService } from "src/services/class/class.service";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Student, Class])],
    controllers: [ClassController],
    providers: [ClassService, ClassResolver
      // {
      //   provide: APP_GUARD,
      //   useClass: RolesGuard,
      // },
    ],
    exports: [ClassService],
  })
  export class ClassModule {}