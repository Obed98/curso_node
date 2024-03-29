import { Subscription } from "./domain/subscription";
export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: Number): Promise<Subscription | null>;
    store(entry: Subscription): Promise<void>;
    update(entry: Subscription): Promise<void>;
    delete(id: Number): Promise<void>;
    findByUserIdAndCode(user_id: Number, code:string): Promise<Subscription | null>;
}