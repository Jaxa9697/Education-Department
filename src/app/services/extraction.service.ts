import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

import { UpdateResponse } from '../models/common';
import { PrintInfoResp, ExtractionSubject, ResponseExtractionSubject } from '../models/curriculum';
import { Department, IDepartment } from '../models/faculty';

@Injectable({
  providedIn: 'root'
})

export class ExtractionService {

  kafedras: Department[] = [];

  constructor(private auth: AuthService) { }

  getSubjectsByExtractionId(id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'exsubjects')
      .set('operation', 'one')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: ResponseExtractionSubject) => {
      return response;
    }));
  }

  getKafedras() {
    const body = new HttpParams()
      .set('route', 'kafedra')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: IDepartment) => {

        if (!response.error) {
          this.kafedras = response.data.slice();
          return this.kafedras;
        }

    }));
  }

  getKafedraByFacultyId(fcId: number) {
    return this.kafedras.filter(o => +o.fcId === fcId);
  }

  getKafedraBySubjectId(id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'kafedra')
      .set('operation', 'one')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: IDepartment) => {
      return response;
    }));
  }

  updateSubject(subject: ExtractionSubject) {
    const body = new HttpParams()
      .set('id', subject.id.toString())
      .set('idStSubject', subject.idStSubject.toString())
      .set('audit', subject.auditCredits.toString())
      .set('lessonHours', subject.lessonHours.toString())
      .set('kmroCredits', subject.kmroCredits.toString())
      .set('kmroHour', subject.kmroHour.toString())
      .set('courseProject', subject.courseProject.toString())
      .set('courseWork', subject.courseWork.toString())
      .set('workKont', subject.workKont.toString())
      .set('lkPlan', subject.lkPlan.toString())
      .set('lkTotal', subject.lkTotal.toString())
      .set('lbPlan', subject.lbPlan.toString())
      .set('lbTotal', subject.lbTotal.toString())
      .set('lb_subgroup', subject.lb_subgroup.toString())
      .set('prPlan', subject.prPlan.toString())
      .set('prTotal', subject.prTotal.toString())
      .set('smPlan', subject.smPlan.toString())
      .set('smTotal', subject.smTotal.toString())
      .set('advice', subject.advice.toString())
      .set('trainingPrac', subject.trainingPrac.toString())
      .set('manuPrac',  subject.manuPrac.toString())
      .set('diplomPrac', subject.diplomPrac.toString())
      .set('bachelorWork', subject.bachelorWork.toString())
      .set('gosExam', subject.gosExam.toString())
      .set('idKafedra', subject.kfName)
      .set('route', 'exsubjects')
      .set('operation', 'update')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: UpdateResponse) => {
      return response;
    }));
  }

  deleteSubject (id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'exsubjects')
      .set('operation', 'remove')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: UpdateResponse) => {
      return response;
    }));
  }

  getPrintInfo (id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'extractions')
      .set('operation', 'custom')
      .set('action', 'printInfo')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(map((response: PrintInfoResp) => {
      return response;
    }));
  }
}
