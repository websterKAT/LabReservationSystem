import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-resetuser',
  templateUrl: './resetuser.component.html',
  styleUrls: ['./resetuser.component.css']
})
export class ResetuserComponent implements OnInit {
  userlist = [];

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private authService:AuthService

  ) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(users => {
      this.userlist = users.userlist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    
  }

  onUserDelete(id) {
    this.authService.deleteUser(id).subscribe(data => {
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["User has been deleted Successfully"], 
          dismissible: true, 
          timeout: 5000,
          type: 'success'
       }); 
       this.ngOnInit();
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"], 
          dismissible: true, 
          timeout: 5000,
          type: 'danger'
       }); 
      }
    })
  }

}
