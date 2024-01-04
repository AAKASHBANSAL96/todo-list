import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../../Models/Todo';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() todo: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() toggleActive: EventEmitter<Todo> = new EventEmitter();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();


  constructor(private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("🚀 ~ file: todo-item.component.ts:31 ~ TodoItemComponent ~ ngOnChanges ~ changes:", changes)
    // this.toggleActive.emit(todo);
    
  }

  onClick(todo: Todo) {
    this.todoDelete.emit(todo);
    this.toastr.success('Your todo has been deleted successfully...');
  }

  toggleCheck(todo: Todo) {
    this.toggleActive.emit(todo);
  }

  editTask(todo: Todo) {
    this.editTodo.emit(todo);
  }
}
