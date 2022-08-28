import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageeService } from '../data-storagee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private dataStorageeService: DataStorageeService
  ) {}

  ngOnInit(): void {}

  onPostData() {
    this.dataStorageeService.storeData();
  }
}
