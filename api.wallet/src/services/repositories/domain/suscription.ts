export interface Suscription {
    id: number,
    code: string,
    cron: string,
    amount: number,
    user_id: number,
    created_at: Date | null,
    updated_at: Date | null
}