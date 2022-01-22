import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  private builderForm(){
    this.form = this.formBuilder.group({

    });
  }
}
