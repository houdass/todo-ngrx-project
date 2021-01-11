import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromTodoActions from './todo/todo.actions';
import * as fromRouterSelectors from './todo/router.selectors';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<any>) {
    this.store.dispatch(fromTodoActions.getTodos());
    this.store.pipe(select(fromRouterSelectors.selectUrl), tap(a => {
      console.log('->', a);
    })).subscribe();
  }
}
