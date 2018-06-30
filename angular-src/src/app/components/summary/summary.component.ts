import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ValidateService } from '../../services/validate.service'; 
import { ReservationService } from '../../services/reservation.service';
import { LabService } from '../../services/lab.service';
import { Router } from '@angular/router'; 

import * as jspdf from 'jspdf';
//require('jspdf-autotable');
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-summary',  
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {
  lablist=[]
  reservationlist = [];
  timestamp:any;
  date:any;
  reserveddate:string;
  labname:string;
  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private reservationService:ReservationService,
    private labService:LabService
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
    
    },
    err => {
      console.log(err);
      return false;
    });
    this.labname= "ALL"


    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservationlist = reservations.reservationlist;
      this.getTimeStamp(this.reservationlist);
      this.reservationlist.reverse();
      console.log(this.reservationlist[1]);
    },
    err => {
      console.log(err);
      return false;
    });
   
   
    
  //   for(let result of this.reservationlist){
  //     console.log('fuck off')
  //     console.log(result.labname);
  //  }
  }


  getTimeStamp(mylst){
    for(let result of mylst){
      this.timestamp = result._id.toString().substring(0,8);
      this.date = new Date(parseInt(this.timestamp, 16 ) * 1000);
      result.addeddate=this.date;
      //console.log(result.addeddate)
     }
  } 

  processdates = function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
    }


  onSearchReservation(){
    //console.log('hiii');
    const seachdate = this.processdates(this.reserveddate);
    
    const searchobj = {
       reserveddate:seachdate,
       labname:this.labname
    }
    

    this.reservationService.searchReservationsAdmin(searchobj).subscribe(dashboard => {
        this.reservationlist = dashboard.reservation;
        this.getTimeStamp(this.reservationlist);
        this.reservationlist.reverse();
        
        
        if(dashboard.success) {
          if(this.reservationlist.length > 0) {
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Found a record "], 
              dismissible: true, 
              timeout: 5000,
              type: 'success'
           });
          } else {
            this.ngFlashMessageService.showFlashMessage({
              messages: ["No Records Found "], 
              dismissible: true, 
              timeout: 15000,
              type: 'warning'
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


    downloadPDF() {
      var rows = [
        
      ];
      //console.log(onerow)
      var i = 0;
      for(let obj of this.reservationlist) {
        var insideRow = [ ];
        insideRow.push(this.reservationlist[i].labname);
        insideRow.push(this.reservationlist[i].reserveddate);
        insideRow.push(this.reservationlist[i].from);
        insideRow.push(this.reservationlist[i].to);
        insideRow.push(this.reservationlist[i].useremail);
       
        i = i + 1;
        rows.push(insideRow);
      }

      const displayDate = new Date().toLocaleDateString();
      const rdate = this.processdates(displayDate);
      
      var columns = ["Labname","Date","From","To","Reserved By"];
      

      var doc = new jspdf();
      doc.text('SUMMARY', 10, 10);
     // doc.text('***************************************************', 10, 10  );
      doc.autoTable(columns,rows);
      doc.text('date '+rdate,2,2);  
      doc.save('table.pdf');
    
    }

}
