import mongoose, {Document, Schema, Model} from 'mongoose';

export interface Todo {
    text: string;
    isCompleted?: boolean;
}

interface TodoDocument extends Document, Todo {}

const todoSchema: Schema<TodoDocument>  = new Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const TodoModel: Model<TodoDocument> = mongoose.model<TodoDocument>('Todos', todoSchema);

export default TodoModel;