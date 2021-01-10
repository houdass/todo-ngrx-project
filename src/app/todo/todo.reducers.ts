import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Todo } from './todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';

export interface State extends EntityState<Todo> {
  lastUpdate: string;
  loading: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const defaultTodos: any = {
  lastUpdate: new Date().toString(),
  loading: false,
  error: '',
};

const initialState: State = todoAdapter.getInitialState(defaultTodos);

export function todoReducer(state = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionsTypes.GET_TODOS:
      return {
        ...state,
        lastUpdate: new Date().toString(),
        loading: true,
        error: '',
      };
    case TodoActionsTypes.GET_TODOS_SUCCESS:
      return todoAdapter.addAll(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
        loading: false,
        error: '',
      });
    case TodoActionsTypes.GET_TODOS_ERROR:
      return {
        ...state,
        lastUpdate: new Date().toString(),
        loading: false,
        error: action.payload,
      };
    case TodoActionsTypes.ADD_TODO:
      return todoAdapter.addOne(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne(action.payload.todo, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    case TodoActionsTypes.DELETE_TODO:
      return todoAdapter.removeOne(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
      });
    default:
      return state;
  }
}
