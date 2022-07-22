import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-job-opportunity',
  templateUrl: './job-opportunity.component.html',
  styleUrls: ['./job-opportunity.component.css']
})
export class JobOpportunityComponent implements OnInit {
  
  idUser: string;
  newJobForm: FormGroup;
  userIsPermitted: boolean = true;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private messageService: MessageService,
      private jobService: JobService
  ) { }

  ngOnInit() {
      if(!this.userIsPermitted) {
          this.router.navigate(['/']);
      }

      this.idUser = this.activatedRoute.snapshot.params['id'];

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
      debugger;
      if(this.newJobForm.invalid) {
          this.messageService.showSnackbar("Preencha as informações corretamente !", 'snackbar-warning');
          return;
      }

      let data = form.value;

      data['createdBy'] = this.idUser;

      this.jobService.createJob(data);
  }
}
