import mongoose, { Document, Schema, Model } from 'mongoose';

export interface Todo {
    todos: [{
        text: string;
        isCompleted?: boolean;
        id: string;
    }],
    categoryName: string;
    category_id: string;
}

interface TodoDocument extends Document, Todo { }

const todoSchema: Schema<TodoDocument> = new Schema({
    todos: [{
        text: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            required: true,
            unique: true
        }
    }],
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: String,
        required: true,
        indexes: true,
        unique: true
    }
},);

const TodoModel: Model<TodoDocument> = mongoose.model<TodoDocument>('Todos', todoSchema);

export default TodoModel;