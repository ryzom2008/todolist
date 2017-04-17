import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../to-do-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class ToDoItemComponent {
  readonly todoItemClasses = {
    view: 'todo__item',
    edit: 'todo__item edit'
  };

  isEdited = false;
  @Input() todoItem: TodoItem;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdate: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() onDelete: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  editItem() {
    this.isEdited = true;
    this.onEdit.emit();
  }

  updateItem(value: string) {
    this.isEdited = false;
    this.todoItem.summary = value;
    this.onUpdate.emit(this.todoItem);
  }

  deleteItem() {
    this.isEdited = false;
    this.onDelete.emit(this.todoItem);
  }
}
