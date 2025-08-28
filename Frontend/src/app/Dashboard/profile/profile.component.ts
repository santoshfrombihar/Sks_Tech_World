import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    
   profileForm = new FormGroup({
      fullName :  new FormControl(''),
      mobileNumber : new FormControl(''),
      add1 : new FormControl(''),
      add2 : new FormControl(''),
      pincode : new FormControl(''),
      state : new FormControl(''),
      district : new FormControl('')
   });



   onSubmit(){
       
   }
}
