import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  username:string;
  useremail:string;
  labname:String;
  reserveddate:String;
  from:String;
  to:String;
  lablist = [];
  reservationlist = [];

  constructor (
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    this.labname='';
    this.reserveddate='';
    this.from='';
    this.to='';
    
  }

  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}


checkReservationConflict(){
  const seachdate = this.processdates(this.reserveddate);
  
  const searchobj = {
      labname:this.labname,
      reserveddate:seachdate
  }
  let conflict = false;
  let cfrom = "";
  let cto = "";
  this.reservationService.searchReservationByDate(searchobj).subscribe(dashboard => {
      this.reservationlist = dashboard.reservation;
      if(this.reservationlist.length >= 1){
        for(let obj of this.reservationlist){
         if(this.to > obj["form"] && this.to <= obj["to"]){
           cto = obj["to"];
           cfrom = obj["from"];
           conflict = true;
         } else if(this.from > obj["from"] && this.from < obj["to"]){
          cto = obj["to"];
          cfrom = obj["from"];
           conflict = true;
         } else if(this.from >= obj["from"] && this.to <= obj["to"]){
          cto = obj["to"];
           cfrom = obj["from"];
           conflict = true;
         } else if(this.from <= obj["from"] && this.to >= obj["to"]) {
           cto = obj["to"];
           cfrom = obj["from"];
            conflict = true;
         } else {
           conflict = false;
         }
        }
        if(conflict){
          this.ngFlashMessageService.showFlashMessage({
            messages: ["there is a reservation on this day from "+cfrom+" to "+cto], 
             dismissible: true, 
             timeout: 10000,
             type: 'danger'
           });
        } else {
          this.onReserveLab();
        }
        
      } else {
        this.onReserveLab();
      }
      },
      err => {
        console.log(err);
        return false;
      });
  }

  
  
  onReserveLab() {
    
    const user = this.authService.loadUser();
    const rdate = this.reserveddate.toString();
    const realdate = this.processdates(rdate);
    console.log(realdate);
    const reservation = {
      username:user.username,
      useremail:user.email,
      labname:this.labname,
      reserveddate:realdate,
      from:this.from,
      to:this.to
    }
    console.log(reservation);
    
   if(!this.validateService.validateReservation(reservation)){
      //console.log(lab.labname);
      //console.log(lab.description);
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please fill Requied Fields"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });
       return false;
    }


    
    this.reservationService.insertReservation(reservation).subscribe(data => {
      if(data.success) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Reservation has been successfully"], 
          dismissible: true, 
          timeout: 5000,
          type: 'success'
       }); 
        this.ngOnInit();
        this.router.navigate(['/addreservation']); 
        
      

      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });  
       this.router.navigate(['/addreservation']); 
      }
    });
  }
}
