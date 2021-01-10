import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTodoReducer from '../todo.reducers';
import * as fromTodoSelectors from '../todo.selectors';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent implements OnInit {
  lastUpdate$: Observable<string>;
  count$: Observable<number>;

  constructor(private store: Store<fromTodoReducer.State>) {}

  ngOnInit(): void {
    this.lastUpdate$ = this.store.pipe(select(fromTodoSelectors.selectLastUpdate));
    this.count$ = this.store.pipe(select(fromTodoSelectors.selectTotal));
  }
}
