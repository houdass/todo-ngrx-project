import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { EntitySelectors } from '@ngrx/entity/src/models';

import { State, todoAdapter } from './todo.reducers';
import { Todo } from './todo.model';

export const getTodoState = createFeatureSelector<State>('todo');

export const {
  selectAll: selectAllTodos,
  selectTotal: count,
}: EntitySelectors<Todo, EntityState<Todo>> = todoAdapter.getSelectors();

export const selectAll = createSelector(getTodoState, selectAllTodos);

export const selectTotal = createSelector(getTodoState, count);

export const selectLastUpdate = createSelector(getTodoState, (state: State) => state.lastUpdate);
