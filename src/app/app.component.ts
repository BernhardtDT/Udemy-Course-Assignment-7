import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  myForm: FormGroup;
  forbiddenprojectNames=['alpha', 'beta'];

  ngOnInit(){
    this.myForm = new FormGroup({
      'projectData': new FormGroup({
        'projectname': new FormControl(null, [Validators.required], this.asyncForbiddenProjectNames),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl('stable')
      }),

    })

    this.myForm.patchValue({
      'projectData': {
        'projectname': 'Assignment 7',
        'email': 'user@user.com'
      }
    })
  }

  onSubmit(){
    console.log(this.myForm)
  }

  forbiddenProjectNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenprojectNames.indexOf(control.value) !== -1){
      return{'projectNameisForbidden': true}
    }
    return(null)
  }

  asyncForbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout( () => {
        if(control.value === 'bern'){
          resolve({'nameisForbidden': true})
        }else
        {
          resolve(null)
        }
      },1500);
    });
    return promise;
  }
}
