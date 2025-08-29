import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfile } from '../../Models/UserModel/UserProfileModel';

@Component({
   selector: 'app-profile',
   imports: [ReactiveFormsModule],
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


   profileForm = new FormGroup({
      fullName: new FormControl(''),
      mobileNumber: new FormControl(''),
      add1: new FormControl(''),
      add2: new FormControl(''),
      pincode: new FormControl(''),
      state: new FormControl(''),
      district: new FormControl('')
   });



   onSubmit() {
      const userData : UserProfile = {
         id : '1',
         fullName : this.profileForm.value.fullName,
         mobileNumber :  this.profileForm.value.mobileNumber,
         address : this.profileForm.value.add1 + '' + this.profileForm.value.add2,
         pincode : this.profileForm.value.pincode,
         state : this.profileForm.value.state,
         district : this.profileForm.value.district,
         userId : ''
      }
   }
}
