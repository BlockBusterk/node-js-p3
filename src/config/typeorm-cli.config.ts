import { Class } from 'src/entities/class.entity';
import { Student } from 'src/entities/student.entity';
import { SchoolMigration1735225168955 } from 'src/migrations/1735225168955-SchoolMigration';
import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceOptions : DataSourceOptions = {
  type: 'postgres', 
  host: 'localhost', 
  port: 5432, 
  username: 'postgres', 
  password: 'huyho@ng432002', 
  database: 'postgres', 
  entities: [Class, Student],
  migrations: [SchoolMigration1735225168955], 
};

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
