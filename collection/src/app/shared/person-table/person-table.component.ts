import { Component, Input } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: "./person-table.component.html",
  styleUrls: ["../../app.component.css"],
})
export class PersonTableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
}
