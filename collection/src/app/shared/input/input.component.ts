import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: "./input.component.html",
  styleUrl: "../../app.component.css",
})
export class InputComponent {
  @Input() label: string = "";
  @Input() control: FormControl = new FormControl("");
  @Input() errorMessageRequired: string = "";
  @Input() errorMessagePattern: string = "";
  @Input() type: "text" | "email" | "number" | "tel" = "text";
}
