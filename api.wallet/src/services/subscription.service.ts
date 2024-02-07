import { ApplicationException } from "../common/exceptions/application.exception";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/subscription.dto";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/subscription.repository";

export class SubscriptionService {
    constructor(private readonly suscriptonRepository: SubscriptionRepository) { }
    public async all(): Promise<Subscription[]> {
        return await this.suscriptonRepository.all();
    }

    public async find(id: Number): Promise<Subscription | null> {
        return await this.suscriptonRepository.find(id);
    }

    public async create(entry: SubscriptionCreateDto):Promise<void> {
        const originalEntry = await this.suscriptonRepository.findByUserIdAndCode(entry.user_id,entry.code);
        if(!originalEntry){
            this.suscriptonRepository.store(entry as Subscription);
        }else{
            throw new ApplicationException('User subscription alredady exists.')
        }
    }

    public async update(id: Number, entry: SubscriptionUpdateDto): Promise<void> {
        const originalEntry = await this.suscriptonRepository.find(id);
        if(originalEntry){
            
            originalEntry.amount = entry.amount;
            originalEntry.code = entry.code;
            originalEntry.cron = entry.cron;

            this.suscriptonRepository.update(originalEntry);
        }else{
            throw new ApplicationException('Subscription not exists.')
        }
    }

    public async delete(id: Number): Promise<void> {
        await this.suscriptonRepository.delete(id);
    }
}