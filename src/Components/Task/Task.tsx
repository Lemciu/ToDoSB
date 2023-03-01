export interface Task {
    id?: number;
    name: string;
    description: string;
    dueDate: string;
    priority: number;
    categories: any[];
    completed: boolean;
    alert: boolean;
}