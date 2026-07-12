export interface Topic {
    id: string;
    title: string;
    description: string;
    cardColor: string;
    icon: string;
    favorite: boolean;
    erased: boolean;
    lastTimeOpened: Date;
    notes: number;
}
