import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  labname:String;
  description:String;
  lablist = [];
  imgurls = [
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0582-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0601-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0608-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0648-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0657-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0661-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0578-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0580-1024x683.jpg",
    "http://ucsc.cmb.ac.lk/wp-content/uploads/2016/09/8F1A0584-1024x683.jpg"

  ]




  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
  ) { }

  
  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      var i = 0
      for(var i = 0;i < this.lablist.length;i++){
        this.lablist[i].imgurl = this.imgurls[i];
      }
      
    },
    err => {
      console.log(err);
      return false;
    });
  }

  showSearch(labname){
    this.router.navigate(['search/'+labname]);
  }

}
