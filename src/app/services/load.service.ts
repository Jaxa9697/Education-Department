import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ILoad, ITeacher } from '../models/load';
import { UpdateResponse } from '../models/common';

@Injectable()
export class LoadService {

  constructor(private auth: AuthService) { }

  getLoadSubjectsByKf (kfId: number) {
    const body = new HttpParams()
      .set('kf_id', kfId.toString())
      .set('route', 'ldSubjects')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: ILoad) => {
      return response;
    });
  }

  getTeachersByKf (kfId: number) {
    const body = new HttpParams()
      .set('kf_id', kfId.toString())
      .set('route', 'teachers')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: ITeacher) => {
      return response;
    });
  }

  saveTeacherId (idTeacher: number, idSubject: number) {
    const body = new HttpParams()
      .set('idTeacher', idTeacher.toString())
      .set('idSubject', idSubject.toString())
      .set('route', 'ldSubjects')
      .set('operation', 'update')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }

  deleteTeacherId (idSubject: number) {
    const body = new HttpParams()
      .set('id', idSubject.toString())
      .set('route', 'ldSubjects')
      .set('operation', 'remove')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }
}
