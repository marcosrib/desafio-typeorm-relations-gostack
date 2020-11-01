import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const createOrder =  container.resolve(FindOrderService);
    const order =  await  createOrder.execute({id})
    return response.json(order)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products} = request.body;
    console.log('mkkmkk');

       const createOrder =  container.resolve(CreateOrderService);

       const orders = await createOrder.execute({
         customer_id, products
       })

       return response.json(orders);
  }
}
