import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
  imports: [CommonModule, MatButtonModule],
})
export class ButtonComponent {
  @Input() buttonText: string = "";
  @Input() disabled: boolean = false;
  @Input() message: string | null = null;
  @Input() type: "button" | "submit" | "reset" = "button";
}
