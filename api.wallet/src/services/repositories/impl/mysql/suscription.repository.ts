import connector from '../../../../common/persistence/mysql.persistence'
import { Suscription } from '../../domain/suscription';
export class SuscriptionRepository {
    public async all(): Promise<Suscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_sucription ORDER BY id asc'
        );

        return rows as Suscription[];
    }

    public async find(id: Number): Promise<Suscription | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_suscription WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0] as Suscription;
        }

        return null;

    }

    public async store(entry: Suscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_suscription (amount, code, cron, user_id, created_at) VALUES(?, ?, ?, ?, ?)',
            [entry.amount, entry.code, entry.cron, entry.user_id, now]
        );
    }

    public async update(entry: Suscription): Promise<void> {
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
