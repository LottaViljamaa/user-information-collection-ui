import { Component } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { t } from "./shared/texts";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  t = t;
  title = "collection";
}
