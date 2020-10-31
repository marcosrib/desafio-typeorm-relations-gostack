import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class addOrderIdToOrdersProdcts1604174239111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'order_id',
          type: 'uuid',
          isNullable: true,
        }),
      );
      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'OrderProductOrder',
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orders',
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'OrderProductOrder');
      await queryRunner.dropColumn('orders_products', 'order_id');
    }

}
