import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos$: any;
  isEdit = false;
  newTodo: string;
  selectedTodo: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todos$ = this.todoService.getAll();
  }

  addTodo(newTodo: string): void {
    const todo: Todo = new Todo(newTodo);
    this.todoService.add(todo).subscribe(() => {
      console.info(`Todo: ${todo.name} was successfully created.`);
      this.getTodos();
    });
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.newTodo = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(newTodoInput: string): void {
    this.selectedTodo.name = newTodoInput;
    this.todoService.update(this.selectedTodo).subscribe(() => {
      console.info(`Todo: ${this.selectedTodo.name} was successfully updated.`);
      this.getTodos();
    });
    this.isEdit = false;
    this.newTodo = '';
  }

  deleteTodo(todo: Todo): void {
    this.todoService.delete(todo.id).subscribe(() => {
      console.info(`Todo with ID: ${todo.name} was successfully deleted.`);
      this.getTodos();
    });
  }
}
