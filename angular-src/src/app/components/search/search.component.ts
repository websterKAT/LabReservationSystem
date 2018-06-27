import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ValidateService } from '../../services/validate.service'; 
import { LabService } from '../../services/lab.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute,Params } from '@angular/router'; 



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    labname:string;
    reserveddate:string;
    reservationlist = [];

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
        this.labname = params['labname'];
    });

    this.reservationService.getReservationByDate(this.labname).subscribe(dashboard => {
        this.reservationlist = dashboard.reservation;
        
      },
      err => {
        console.log(err);
        return false;
      });


    }


  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
    }

    onSearchReservation(){
        console.log('hiii');
        const seachdate = this.processdates(this.reserveddate);
        
        const searchobj = {
            labname:this.labname,
            reserveddate:seachdate
        }
        

        this.reservationService.searchReservationByDate(searchobj).subscribe(dashboard => {
            this.reservationlist = dashboard.reservation;
            if(dashboard.success) {
              if(this.reservationlist.length > 0) {
                this.ngFlashMessageService.showFlashMessage({
                  messages: ["Found Records"], 
                  dismissible: true, 
                  timeout: 5000,
                  type: 'success'
               });
            } else {
              this.ngFlashMessageService.showFlashMessage({
                messages: ["No Records "], 
                dismissible: true, 
                timeout: 5000,
                type: 'warning  '
             });
            }
             
            } else {
                this.ngFlashMessageService.showFlashMessage({
                  messages: ["No Records Found"], 
                 dismissible: true, 
                 timeout: 5000,
                 type: 'warning'
               });
            } 
            },
            err => {
              console.log(err);
              return false;
            });
        }
    
    }


  

  



