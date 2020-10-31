import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {

    const findProducts = await this.productsRepository.findAllById(products);
    const newProduct = findProducts.map(p => {
      let filter = products.map(filter => {
        if (filter.id === p.id) {
          return {
             ...p,
             quantity: filter.quantity,
          }

        }

      });
      return {

        ...filter
      }
    })
    console.log(newProduct);


   /* const createOrder = this.ordersRepository.create({
      customer_id,
      products
    })*/
  }
}

export default CreateOrderService;
