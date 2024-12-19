import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ClassService } from '../../services/class/class.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // Fetch all classes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal','teacher')
  @Get()
  async getAllClasses() {
    return await this.classService.getAllClasses();
  }

  // Add a new class
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal')
  @Post()
  async createClass(@Body() createClassDto: any) {
    return await this.classService.createClass(createClassDto);
  }

  // Fetch a class by ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal','teacher')
  @Get(':id')
  async getClassById(@Param('id') id: string) {
    return await this.classService.getClassById(id);
  }

  // Update class details
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal')
  @Patch(':id')
  async updateClass(@Param('id') id: string, @Body() updateClassDto: any) {
    return await this.classService.updateClass(id, updateClassDto);
  }

  // Delete a class
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal')
  @Delete(':id')
  async deleteClass(@Param('id') id: string) {
    return await this.classService.deleteClass(id);
  }
}
