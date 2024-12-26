import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SchoolMigration1735225168955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'student',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'uuid_generate_v4()', // Use default to auto-generate UUID
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'classId',
                  type: 'varchar',
                  isNullable: false,
                },
              ],
            })
          );

          await queryRunner.createTable(
            new Table({
              name: 'class',  // Table name
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'uuid_generate_v4()',  // UUID auto generation
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,  // Non-nullable field
                },
              ],
            })
          );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('student');
        await queryRunner.dropTable('class');
    }

}
