export interface Option extends Document {
    name: string;
    category: string;
    values: string[];
    isEditable: boolean;
    lastUpdated: Date;
}