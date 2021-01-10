import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import * as fromTodoReducer from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';
import * as fromTodoSelectors from '../todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  isEdit = false;
  newTodo: string;
  index: number;
  selectedTodo: Todo;
  todos$: Observable<Array<Todo>>;
  count$: Observable<number>;

  constructor(private store: Store<fromTodoReducer.State>) {}

  ngOnInit(): void {
    this.todos$ = this.store.pipe(select(fromTodoSelectors.selectAll));
    this.count$ = this.store.pipe(select(fromTodoSelectors.selectTotal));
  }

  addTodo(newTodo: string): void {
    const todo: Todo = new Todo(newTodo);
    this.store.dispatch(new fromTodoActions.AddTodo(todo));
  }

  updateTodo(index: number, todo: Todo): void {
    this.isEdit = true;
    this.newTodo = todo.name;
    this.selectedTodo = todo;
    this.index = index;
  }

  confirmTodo(newTodoInput: string): void {
    this.selectedTodo.name = newTodoInput;
    this.store.dispatch(new fromTodoActions.UpdateTodo({ id: this.index, updatedTodo: this.selectedTodo }));
    this.isEdit = false;
    this.newTodo = '';
  }

  deleteTodo(id: number): void {
    this.store.dispatch(new fromTodoActions.DeleteTodo(id));
  }
}
