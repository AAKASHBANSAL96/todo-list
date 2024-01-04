import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../../Models/Todo'
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit, OnChanges {
  public title: String;
  public desc: String;

  public localItem: string | null;
  public todos: Todo[];

  public max: number = 10000;
  public min: number = 0;

  public btnText: String = "Add todo";

  @Input() updateTodo: Todo | null = null;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  @Output() updateTodoAdd: EventEmitter<Todo> = new EventEmitter();
  @Output() showCompletedTodos: EventEmitter<boolean> = new EventEmitter();

  constructor(private toastr: ToastrService) {
    this.title = "";
    this.desc = "";

  }

  ngOnInit(): void {
  }

  cancelUpdate() {
    this.title = "";
    this.desc= "";
    this.updateTodo = null;
    this.btnText = "Add todo"
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!_.isEmpty(this.updateTodo)) {
      this.title = this.updateTodo.title;
      this.desc = this.updateTodo.desc;

      this.btnText = "Update todo"
    }

  }
  onSubmit() {
    if ((_.isEmpty(this.title) || _.isEmpty(this.desc)) && _.isEmpty(this.updateTodo)) {
      this.toastr.error('title or description can not be blank')
    } else if (!_.isEmpty(this.title) && !_.isEmpty(this.desc) && _.isEmpty(this.updateTodo)) {
      const todo = {
        sno: Math.floor(Math.random() * (this.max - this.min + 1)) + (this.min),
        title: this.title,
        desc: this.desc,
        active: true
      }
      this.title = "";
      this.desc = "";
      this.todoAdd.emit(todo);
      this.toastr.success('Your todo added successfully...')
    } else if (!_.isEmpty(this.updateTodo) && !_.isEmpty(this.title) && !_.isEmpty(this.desc)) {
      console.log('else 33333333333333');

      this.localItem = localStorage.getItem('todos');
      if (this.localItem != null) {
        const updatedTodo = {
          sno: this.updateTodo.sno,
          title: this.title,
          desc: this.desc,
          active: this.updateTodo.active
        }

        this.cancelUpdate()

        this.updateTodoAdd.emit(updatedTodo)
        this.toastr.success('Your todo have been updated successfully...')
      }
    }
  }

}
