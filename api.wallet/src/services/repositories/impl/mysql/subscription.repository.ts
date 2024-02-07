import connector from '../../../../common/persistence/mysql.persistence'
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';
export class SubscriptionMySQLRepository implements SubscriptionRepository {
    
    public async all(): Promise<Subscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_sucription ORDER BY id asc'
        );

        return rows as Subscription[];
    }

    public async find(id: Number): Promise<Subscription | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_suscription WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0] as Subscription;
        }

        return null;

    }

    public async findByUserIdAndCode(user_id: Number, code: string): Promise<Subscription | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_suscription WHERE user_id = ? and code = ?',
            [user_id, code]
        );

        if (rows.length) {
            return rows[0] as Subscription;
        }

        return null;
    }

    public async store(entry: Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_suscription (amount, code, cron, user_id, created_at) VALUES(?, ?, ?, ?, ?)',
            [entry.amount, entry.code, entry.cron, entry.user_id, now]
        );
    }

    public async update(entry: Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE wallet_suscription SET amount = ?, code = ?, cron = ?, user_id = ?, updated_at = ? WHERE id = ?)',
            [entry.amount, entry.code, entry.cron, entry.user_id, now, entry.id]
        );
    }

    public async delete(id: Number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_suscription WHERE id = ?)',
            [ id]
        );
    }
}
