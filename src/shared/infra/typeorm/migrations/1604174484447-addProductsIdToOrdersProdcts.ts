import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class addProductsIdToOrdersProdcts1604174484447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'product_id',
          type: 'uuid',
          isNullable: true,
        }),
      );
      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'ProductProductOrder',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

      await queryRunner.dropForeignKey('orders_products', 'ProductProductOrder');
      await queryRunner.dropColumn('orders_products', 'product_id');
    }

}
