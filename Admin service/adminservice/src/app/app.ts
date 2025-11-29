import { Component, signal, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected readonly title = signal('adminservice');

  // List of all admins
  adminDetails: any[] = [];

  // Object for register/update
  adminToUpdate = {
    adminId: null as any,
    adminName: '',
    email: '',
    password: '',
    phoneNumber: '',
    mallName: '',
    mallLocation: '',
    totalShops: 0,
    address: '',
    role: ''
  };

  constructor(private adminService: AdminService) {
    this.getAdminDetails();
  }

  // Create new admin
  register(registerForm: NgForm) {
    this.adminService.createAdmin(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getAdminDetails();
      },
      (err) => console.error(err)
    );
  }

  // Get all admins
  getAdminDetails() {
    this.adminService.getAdmins().subscribe(
      (resp: any) => {
        this.adminDetails = resp;
      },
      (err) => console.error(err)
    );
  }

  // Delete admin
  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.adminId).subscribe(
      () => this.getAdminDetails(),
      (err) => console.error(err)
    );
  }

  // Prepare admin for update
  edit(admin: any) {
    this.adminToUpdate = { ...admin };
  }

  // Update admin
  updateAdmin() {
    this.adminService.updateAdmin(this.adminToUpdate.adminId, this.adminToUpdate).subscribe(
      () => this.getAdminDetails(),
      (err) => console.error(err)
    );
  }
}
