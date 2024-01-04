import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../Models/Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() isShowCompleted: boolean;

  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter();

  localItems: string | null;
  data: Todo[];


  constructor() {
    this.localItems = localStorage.getItem("todos");
    this.isShowCompleted = localStorage.getItem("isShowCompleted") == "true" ? true : false;

    if (this.localItems == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItems);
    }
  }

  ngOnInit(): void {

  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  addTodo(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  toggleCheckBox(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

  editTodoData(todo: Todo) {
    this.updateTodo.emit(todo);
  }

}
