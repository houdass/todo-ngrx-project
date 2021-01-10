import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from './todo.model';

export enum TodoActionsTypes {
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export class AddTodo implements Action {
  readonly type = TodoActionsTypes.ADD_TODO;

  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionsTypes.UPDATE_TODO;

  constructor(public payload: { todo: Update<Todo> }) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO;
  constructor(public payload: number) {}
}

export type TodoActions = AddTodo | DeleteTodo | UpdateTodo;
