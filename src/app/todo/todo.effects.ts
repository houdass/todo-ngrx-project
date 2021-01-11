import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromTodoActions from './todo.actions';
import { TodoService } from './todo2.service';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  getTodos$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(fromTodoActions.getTodos.type),
      switchMap(() => {
        return this.todoService.getAll().pipe(
          map((todos: Array<Todo>) => fromTodoActions.getTodosSuccess({ todos })),
          catchError((error: string) => of(fromTodoActions.getTodosError({ error }))),
        );
      }),
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
