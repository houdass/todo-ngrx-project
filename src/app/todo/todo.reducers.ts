import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Todo } from './todo.model';
import {
  addTodo,
  deleteAllTodos,
  deleteTodo,
  getTodos,
  getTodosError,
  getTodosSuccess,
  updateTodo,
} from './todo.actions';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

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

export const reducer = createReducer(
  initialState,
  on(getTodos, (state: State) => ({
    ...state,
    lastUpdate: new Date().toString(),
    loading: true,
    error: '',
  })),
  on(getTodosSuccess, (state: State, { todos }) =>
    todoAdapter.setAll(todos, {
      ...state,
      lastUpdate: new Date().toString(),
      loading: false,
      error: '',
    }),
  ),
  on(getTodosError, (state: State, { error }) => ({
    ...state,
    error,
    lastUpdate: new Date().toString(),
    loading: false,
  })),
  on(addTodo, (state: State, { todo }) =>
    todoAdapter.addOne(todo, {
      ...state,
      lastUpdate: new Date().toString(),
    }),
  ),
  on(updateTodo, (state: State, { todo }) =>
    todoAdapter.updateOne(todo, {
      ...state,
      lastUpdate: new Date().toString(),
    }),
  ),
  on(deleteTodo, (state: State, { id }) =>
    todoAdapter.removeOne(id, {
      ...state,
      lastUpdate: new Date().toString(),
    }),
  ),
  on(deleteAllTodos, (state: State) =>
    todoAdapter.removeAll({
      ...state,
      updateDate: new Date().toString(),
    }),
  ),
);

export function todoReducer(state: State | undefined, action: Action): any {
  return reducer(state, action);
}
