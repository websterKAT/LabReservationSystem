import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages'; 
import {Router} from '@angular/router'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:String;
  lastName:String;
  userName:String;
  email:String;
  password:String;  

  constructor(
    private validateService:ValidateService,
    private ngFlashMessageService: NgFlashMessageService,
    private authService:AuthService,
    private router:Router
    )  { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username:this.userName,
      firstname:this.firstName,
      lastname:this.lastName,
      email:this.email,
      password:this.userName
    }

    if(!this.validateService.validateRegister(user)){
      this.ngFlashMessageService.showFlashMessage({
       messages: ["Please fill Requied Fields"], 
        dismissible: true, 
        timeout: 5000,
        type: 'danger'
      });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
          messages: ["E-mail you entered is invalid"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });
      return false;
    }


    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["User registered Successfully"], 
         dismissible: true, 
         timeout: 5000,
         type: 'success'
       });  
       this.router.navigate(['/login']); 
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });  
       this.router.navigate(['/register']); 
      }
    });


  }

    

}
