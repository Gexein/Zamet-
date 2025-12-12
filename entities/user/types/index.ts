import { TTheme } from "../../../shared/types";

export interface IUser {
    id: number;
    name: string;
    theme: TTheme;
    created_at: string;
    updated_at: string;
}

