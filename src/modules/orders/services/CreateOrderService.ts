import { inject, injectable } from 'tsyringe';
import validate from 'uuid-validate';
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

    if (!validate(customer_id)) {
      throw new AppError('UUID invalid', 400)
    }

    const findProducts = await this.productsRepository.findAllById(products);

    const findCustomer = await this.customersRepository.findById(customer_id);

    const productIds = findProducts.map(pfilter => pfilter.id)

    const productExist = findProducts.map(product => productIds.includes(product.id))

    console.log(findCustomer);

    if (!productExist) {
      throw new AppError('Product not exist', 400)
    }



    if (findCustomer === undefined) {
      throw new AppError('Customer not exist', 400);
    }


    const insufficientProduct = findProducts.findIndex(p => {
      const prod = products.filter(f => f.quantity > p.quantity)
      if (prod.length > 0) {
        return prod;
      }

    })

    if (insufficientProduct >= 0) {
      throw new AppError('Product insufficient');
    }

    const newProduct = products.map(p => ({
      product_id: p.id,
      quantity: Number(p.quantity),
      price: findProducts
        .filter(filter => filter.id == p.id)
        .map(p => p.price)
        .values()
        .next().value
    }))



    console.log(newProduct);
    console.log(findCustomer);


    const order = await this.ordersRepository.create({
      customer: findCustomer,
      products: newProduct
    })


    const orderAndProductQuantoty = products.map(product => ({
      id: product.id,
      quantity: findProducts.filter(p => p.id ===product.id)
      .map(p => p.quantity)
      .values()
      .next().value - product.quantity

    }))

    await this.productsRepository.updateQuantity(orderAndProductQuantoty)
    return order;

  }
}

export default CreateOrderService;
