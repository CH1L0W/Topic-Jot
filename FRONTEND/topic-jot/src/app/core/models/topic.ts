export interface Topic {
    id?: number;
    title: string;
    description: string;
    cardColor: string;
    icon: string;
    favorite: boolean;
    erased: boolean;
    lastTimeOpened?: Date;
    notes?: number;
}
