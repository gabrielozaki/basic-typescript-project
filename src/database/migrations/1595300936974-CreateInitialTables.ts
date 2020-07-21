import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateInitialTables1595300936974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'departament',
              columns: [
                  {
                      name: 'id',
                      type: 'varchar',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'uuid',
                      default: 'UUID()'
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      length: '200',
                  },
                  {
                      name: 'created_at',
                      type: 'timestamp',
                      default: 'now()',
                  },
                  {
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                  },
              ],
          })
        );

        await queryRunner.createTable(
          new Table({
              name: 'user',
              columns: [
                  {
                      name: 'id',
                      type: 'varchar',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'uuid',
                      default: 'UUID()'
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      length: '50',
                  },
                  {
                      name: 'age',
                      type: 'integer'
                  },
                  {
                      name: 'created_at',
                      type: 'timestamp',
                      default: 'now()',
                  },
                  {
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                  },
                  {
                      name: 'departament_id',
                      type: 'varchar'
                  }
              ],
          })
        );

        await queryRunner.createForeignKey('user', new TableForeignKey({
            name: 'FK_user_departament_id',
            columnNames: ['departament_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'departament',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", 'FK_user_departament_id');
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('departament');
    }

}
