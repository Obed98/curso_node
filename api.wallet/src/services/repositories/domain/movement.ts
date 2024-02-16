import { MovementType } from "../../../common/enum/movement.type";

export interface Movement{
    id: number,
    type: MovementType,
    user_id: number,
    amount: number,
    created_at: Date | null,
    updated_at: Date | null
}