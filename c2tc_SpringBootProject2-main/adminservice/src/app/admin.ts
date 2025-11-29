import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private API = 'http://localhost:8080/admins';  // matches @RequestMapping("/admins")

  // Create new admin
  createAdmin(adminData: any): Observable<any> {
    return this.http.post(this.API, adminData);
  }

  // Get all admins
  getAdmins(): Observable<any> {
    return this.http.get(this.API);
  }

  // Get admin by ID
  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  // Update admin
  updateAdmin(id: number, adminData: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, adminData);
  }

  // Delete admin
  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
