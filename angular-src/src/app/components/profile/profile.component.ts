import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ReservationService } from '../../services/reservation.service';
import {Router,ActivatedRoute,Params} from '@angular/router';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  reslist = [];

  constructor (
    private authService:AuthService,
    private router:Router,
    private reservationService:ReservationService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    const username = this.authService.loadUser().username;
    this.reservationService.getMyReservation(username).subscribe(List => {
      this.reslist = List.reslist;
      
    },
    err => {
      console.log(err);
      return false;
    });




    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
    
  }


  onReservationDelete(id) {
    this.reservationService.deleteReservation(id).subscribe(data => {
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Reservation has been deleted successfully"], 
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

onShowOneReservation(id) {
  this.router.navigate(['editreservation/'+id]);
}

}


