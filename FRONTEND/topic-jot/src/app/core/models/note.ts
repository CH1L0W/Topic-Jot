export interface Note {
    id: number;
    topicId: number;
    title: string;
    content: string;
    favorite: boolean;
    erased: boolean;

    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}