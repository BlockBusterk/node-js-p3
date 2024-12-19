import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "src/auth/auth.module";
import { RolesGuard } from "src/auth/guards/role.guard";
import { ClassController } from "src/controllers/class/class.controller";
import { ClassService } from "src/services/class/class.service";

@Module({
    imports: [AuthModule],
    controllers: [ClassController],
    providers: [ClassService, 
      // {
      //   provide: APP_GUARD,
      //   useClass: RolesGuard,
      // },
    ],
    exports: [ClassService],
  })
  export class ClassModule {}