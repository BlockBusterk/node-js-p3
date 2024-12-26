import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from 'src/dto/class/create-class.dto';
import { UpdateClassDto } from 'src/dto/class/update-class.dto';
import { Class } from 'src/entities/class.entity';
import { Student } from 'src/entities/student.entity';
import { ErrorResponse } from 'src/errors/ErrorResponse';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
 constructor(
     @InjectRepository(Student)
     private readonly studentRepository: Repository<Student>,
     @InjectRepository(Class)
     private readonly classRepository: Repository<Class>,
   ){}

  async getAllClasses() {
    try {
        let classes = await this.classRepository.find();
        return {
          status: 'sucess',
          requestedAt: Date.now(),
          data: {
            classes: classes,
          },
        };
      } catch (error) {
        if (error instanceof ErrorResponse) {
          throw error; // Re-throw the original ErrorResponse
        } else {
          // If it's not an ErrorResponse, create a new one
          console.log(error);
          throw new ErrorResponse('An unexpected error occurred', 500);
        }
      }
}

  async createClass(createClassDto: CreateClassDto) {
    try {
        
            const classD = await this.classRepository.findOneBy({name: createClassDto.name}) 
            console.log("classD", classD)
            if(classD){
                throw new ErrorResponse('There is class with that name', 404, createClassDto);
            }
            const newClass = await this.classRepository.create(createClassDto);
            await this.classRepository.save(newClass)
            return {
                status: "sucess",
                requestedAt: Date.now(),
                data: {
                    class: newClass
                }
            };
        } catch (error) {
            if (error instanceof ErrorResponse) {
                throw error; // Re-throw the original ErrorResponse
            } else {
                // If it's not an ErrorResponse, create a new one
                console.log(error)
                throw new ErrorResponse('An unexpected error occurred', 500);
            }
  }
}

  async getClassById(id: string) {
    try {
        const classD = await this.classRepository.findOneBy({id});
        if (!classD) {
          throw new ErrorResponse('This class is not exist', 404);
        }
        return {
          status: 'sucess',
          requestedAt: Date.now(),
          data: {
            class: classD,
          },
        };
      } catch (error) {
        if (error instanceof ErrorResponse) {
          throw error; // Re-throw the original ErrorResponse
        } else {
          // If it's not an ErrorResponse, create a new one
          throw new ErrorResponse('An unexpected error occurred', 500);
        }
      }
       
      }

  async updateClass(id: string, updateClassDto: UpdateClassDto) {
    try {
        
            const classD = await this.classRepository.findOneBy({id})
            if(!classD){
                throw new ErrorResponse('This class is not exist', 404);
            }
            let className = await this.classRepository.findOneBy({name: updateClassDto.name})
            if(className){
                throw new ErrorResponse('There is class with that name', 404);
            }
           
            const updateClass = Object.assign(classD,updateClassDto)
            await this.classRepository.save(updateClass)
            return {
                status: "sucess",
                requestedAt: Date.now(),
                data: {
                    class: updateClass
                }
            };
        } catch (error) {
            // Handle ErrorResponse and non-ErrorResponse errors differently
        if (error instanceof ErrorResponse) {
            throw error; // Re-throw the original ErrorResponse
        } else {
            // If it's not an ErrorResponse, create a new one
            throw new ErrorResponse('An unexpected error occurred', 500);
        }
        }
       
      }

  async deleteClass(id: string) {
    try {
      const classD = await this.classRepository.findOneBy({id}) 
      if(!classD){
          throw new ErrorResponse('This class is not exist', 404);
      }
      await this.classRepository.remove(classD);
      return {
          status: "sucess",
          requestedAt: Date.now(),
          data: {
              class: classD
          }
      };
  } catch (error) {
    // Handle ErrorResponse and non-ErrorResponse errors differently
if (error instanceof ErrorResponse) {
    throw error; // Re-throw the original ErrorResponse
} else {
    // If it's not an ErrorResponse, create a new one
    throw new ErrorResponse('An unexpected error occurred', 500);
}
}

}
}
