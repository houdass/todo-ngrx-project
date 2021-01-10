import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTodoReducer from '../todo.reducers';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html'
})
export class TodoInfoComponent implements OnInit {
  todoState$: Observable<fromTodoReducer.State>;

  constructor(private store: Store<fromTodoReducer.State>) {}

  ngOnInit(): void {
    this.todoState$ = this.store.pipe(select('todo'));
  }
}
