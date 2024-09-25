import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-information.component.html',
  styleUrl: './add-information.component.css'
})
export class AddInformationComponent implements OnInit {
  informationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Lomake, jossa vain yksi kenttä
    this.informationForm = this.fb.group({
      firstName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.informationForm.valid) {
      console.log('Form Submitted', this.informationForm.value);
    }
  }
}
