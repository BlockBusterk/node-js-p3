import { Injectable } from '@nestjs/common';
import { CreateClassDto } from 'src/dto/class/create-class.dto';
import { ErrorResponse } from 'src/errors/ErrorResponse';
import { checkClassById, checkClassByName, checkStudentById, generateRandomID, readJsonFileAsync, writeData } from 'src/utils/utils';

const classPath = '../../data/classes.json'


@Injectable()
export class ClassService {
 

  async getAllClasses() {
    try {
        let classes = readJsonFileAsync(classPath)
          return {
                status: "sucess",
                requestedAt: Date.now(),
                count: classes.length,
                data: {
                    classes: classes
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

  async createClass(createClassDto: CreateClassDto) {
    try {
        let classes = readJsonFileAsync(classPath)
            const classD = checkClassByName(createClassDto.name) 
            console.log("classD", classD)
            if(classD){
                throw new ErrorResponse('There is class with that name', 404, createClassDto);
            }
            const newClass = { id: generateRandomID('cla',8), ...createClassDto };
            classes.push(newClass);
            writeData(classPath, classes)
            return {
                status: "sucess",
                requestedAt: Date.now(),
                count: classes.length,
                data: {
                    class: classD
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
            const classD = checkClassById(id) 
            if(!classD){
                throw new ErrorResponse('This class is not exist', 404);
            }
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

  async updateClass(id: string, updateClassDto: any) {
    try {
        let classes = readJsonFileAsync(classPath)
            const classD = checkClassById(id) 
            if(!classD){
                throw new ErrorResponse('This class is not exist', 404);
            }
            let className = classes.find( (el: { name: string; id:string }) => (el.name === updateClassDto.name && el.id !== id));
            if(className){
                throw new ErrorResponse('There is class with that name', 404);
            }
           
            const updateClass = Object.assign(classD,updateClassDto)
            const index = classes.map(e => e.id).indexOf(classD)
            classes[index] = updateClass;
            writeData(classPath, classes)
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
    let classes = readJsonFileAsync(classPath)
      const classD = checkClassById(id) 
      if(!classD){
          throw new ErrorResponse('This class is not exist', 404);
      }
      const index = classes.map(e => e.id).indexOf(classD)
      classes.splice(index,1)
      writeData(classPath, classes)
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
