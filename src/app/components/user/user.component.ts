import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   user: User;
   users: User[];
   constructor(private dataService: DataService) {
    console.log('constructor ran...');
  }

  ngOnInit() {
    console.log('ngOnInit ran...');
      this.user = {
      id: 0,
      name: '',
      age: 0,
      salary: 0
    };
    this.users = this.retrieveUsers();
  }

  saveUser() {
    console.log('save user...');
     this.dataService.saveUser(this.user).subscribe(
      (result) => {
        console.log(result);
        this.retrieveUsers();
      },
      (error) => {
        console.log(<any>error);
      }
      // error => this.errorMessage = <any> error
    );
  }
  retrieveUsers() {
      console.log('retrieve user...');
       this.dataService.retrieveUsers()
        .subscribe(
            users => this.users = users,
            error => console.log(<any>error)
        );
      return this.users;
      /*this.dataService.retrieveUsers.subscribe(
        users => this.users = users,
        error => console.log(<any>error),
      );*/
   }
}
