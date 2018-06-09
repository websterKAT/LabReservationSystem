import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ValidateService } from '../../services/validate.service'; 
import { LabService } from '../../services/lab.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router'; 

@Component({
  selector: 'app-editreservation',
  templateUrl: './editreservation.component.html',
  styleUrls: ['./editreservation.component.css']
})
export class EditreservationComponent implements OnInit {
  reservation:any;
  reservationId: any;
  id:string;
  username:string;
  useremail:string;
  labname:String;
  reserveddate:String;
  from:String;
  to:String;
  lablist = [];

  
  
  constructor (
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.reservation=0;
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });

    this.reservationId = this.route.params.subscribe(params => {
      this.id = params['id'];
    console.log(this.id);
    });
    this.reservationService.getOneReservation(this.reservationId).subscribe(onereservation => {
      console.log('fuclll')
      this.reservation = onereservation.reservation;
      console.log(this.reservation);
    },
    err => {
      console.log(err);
      return false;
    });

    

  }
  
}

  



   
  

