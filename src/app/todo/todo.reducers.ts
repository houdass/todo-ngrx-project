import { Todo } from './todo.model';
import { TodoActionsTypes } from './todo.actions';

export interface State {
  todos: Array<Todo>;
  lastUpdate: string;
}

const initialState: State = {
  todos: [new Todo('Learn Java'), new Todo('Learn Angular')],
  lastUpdate: new Date().toString(),
};

export function todoReducer(state = initialState, action): State {
  switch (action.type) {
    case TodoActionsTypes.ADD_TODO:
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [...state.todos, action.payload],
      };
    case TodoActionsTypes.DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter((todo: Todo) => todo.id !== action.payload),
        lastUpdate: new Date().toString(),
      };
    case TodoActionsTypes.UPDATE_TODO:
      const todo: Todo = state.todos[action.payload.id];
      const updatedTodo: any = {
        todo,
        ...action.payload.updatedTodo,
      };
      const todos: Array<Todo> = [...state.todos];
      todos[action.payload.id] = updatedTodo;
      return {
        ...state,
        todos,
        lastUpdate: new Date().toString(),
      };
    default:
      return state;
  }
}
