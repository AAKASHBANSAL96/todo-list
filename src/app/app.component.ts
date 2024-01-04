import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges, OnInit } from '@angular/core';
import { TodosComponent } from './my-components/todos/todos.component';
import { Todo } from './Models/Todo'
import { AddTodoComponent } from './my-components/add-todo/add-todo.component';
import { isEmpty } from 'lodash';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TodosComponent, AddTodoComponent]
})
export class AppComponent implements OnInit {
  title = 'angularreactapp';
  localItems: string | null;
  todos: Todo[];
  tempData: Todo[];
  isShowCompleted: boolean;
  updateTodo: Todo;

  constructor() {
    this.localItems = localStorage.getItem("todos");
    if (this.localItems == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItems)
    }
  }

  ngOnInit(): void {

  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    // this.todos = this.todos
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  updateTodoAddFunc(todo:Todo) {
    const index = this.todos.findIndex(childTodo => childTodo.sno === todo.sno);
    this.todos[index].title = todo.title;
    this.todos[index].desc = todo.desc;
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  showCompletedTodoList(isShowCompleted: boolean) {
    this.isShowCompleted = isShowCompleted;
    console.log("🚀 ~ file: app.component.ts:42 ~ AppComponent ~ showCompleted ~ this.isShowCompleted:", this.todos)
    localStorage.setItem("isShowCompleted", String(isShowCompleted))
  }

  updateTodoData(todo: Todo) {
    this.updateTodo = todo;
  }
}