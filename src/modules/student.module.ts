import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/guards/role.guard";
import { StudentController } from "src/controllers/student/student.controller";
import { StudentService } from "src/services/student/student.service";

@Module({
    imports: [AuthModule],
    controllers: [StudentController],
    providers: [StudentService,
      // {
      //   provide: APP_GUARD,
      //   useClass: RolesGuard,
      // },
    ],
    exports: [StudentService], // Export the service if it needs to be used in other modules
  })
  export class StudentModule {}