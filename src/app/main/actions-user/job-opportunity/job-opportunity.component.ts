import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-opportunity',
  templateUrl: './job-opportunity.component.html',
  styleUrls: ['./job-opportunity.component.css']
})
export class JobOpportunityComponent implements OnInit {
  newJobForm: FormGroup;
  userIsPermitted: boolean = true;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
      if(!this.userIsPermitted) {
          this.router.navigate(['/']);
      }

      this.buildLoginForm();
  }

  buildLoginForm() {
      this.newJobForm = this.formBuilder.group({
          jobName: ['', Validators.required],
          companyName: ['', Validators.required],
          turn: ['', Validators.required],
          avaibility: ['', Validators.required],
          contactEmail: ['', Validators.required],
          salary: ['', Validators.required],
          description: ['', Validators.required]
      });
  }

  create(form) {
      
    console.log(form);
  }
}
