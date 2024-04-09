import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.css'
})
export class DropdownItemComponent {

  @Output()
  addField = new EventEmitter<string>();

  addFieldNote(fieldType: string) {
    this.addField.emit(fieldType);
  }

}
