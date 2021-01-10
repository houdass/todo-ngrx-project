import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Todo } from './todo.model';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}todos`);
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}todos`, todo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}todos/${id}`);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}todos/${todo.id}`, todo);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}todos`);
  }
}
