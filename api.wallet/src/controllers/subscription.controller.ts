import { Request,Response } from "express";
import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { SubscriptionService } from "../services/subscription.service";
import { BaseController } from "../common/controllers/base.controllers";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/subscription.dto";

@route('/subscriptions')
export class SubscriptionController extends BaseController{
    constructor(private readonly subscritionService: SubscriptionService){
        super();
    }

    @GET()
    public async index(req: Request, res:Response){
        try {
            res.send(this.subscritionService.all()); 
        } catch (error) {
            this.handleException(error, res);
        }
        
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res:Response){
        try {
            const id = parseInt(req.params.id);
            res.send(await this.subscritionService.find(id));  
        } catch (error) {
            this.handleException(error, res);
        }
        
    }

    @POST()
    public async store(req:Request, res:Response){
        try {
            await this.subscritionService.create({
                user_id: req.body.user_id,
                cron: req.body.cron,
                code: req.body.code,
                amount: req.body.amount
            } as SubscriptionCreateDto);
            res.send();
        } catch (error) {
            this.handleException(error,res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req:Request, res:Response){
        try {
            const id = parseInt(req.params.id);
            await this.subscritionService.update(id,{
                code: req.body.code,
                cron: req.body.cron,
                amount: req.body.amount
            } as SubscriptionUpdateDto);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async delete(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id);
            await this.subscritionService.delete(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}