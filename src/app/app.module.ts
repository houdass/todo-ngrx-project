import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoInfoComponent } from './todo/todo-info/todo-info.component';
import { todoReducer } from './todo/todo.reducers';
import { environment } from '../environments/environment';
import { TodoEffects } from './todo/todo.effects';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoInfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todo: todoReducer, router: routerReducer }),
    EffectsModule.forRoot([TodoEffects]),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
