import { DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceOptions : DataSourceOptions = {
  type: 'postgres', 
  host: 'localhost', 
  port: 5432, 
  username: 'postgres', 
  password: 'huyho@ng432002', 
  database: 'postgres', 
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'], 
  synchronize: false
};

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
