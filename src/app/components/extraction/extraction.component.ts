import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddExtractionSubjectComponent } from '../../dialogs/add-extraction-subject/add-extraction-subject.component';
import { DeleteDialogComponent } from '../../dialogs/delete/delete.dialog.component';

import { ExtractionService } from '../../services/extraction.service';
import { CurriculumList, ExtractionSubject, PrintInfo } from '../../models/curriculum';
import { AuthService } from '../../services/auth.service';

const separateIfMoreThanOne = (item, index) => {
  if (item.length > 1) {
    return  item.split(',')[index];
  }
  return item;
}

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['../standard/standard.component.css'],
  providers: [ ExtractionService ]
})

export class ExtractionComponent implements OnInit {

  @Input() Curriculum: CurriculumList;
  @Input() idSpec: number;
  @ViewChild('header') header: ElementRef;

  subjects: ExtractionSubject[] = [];
  error = false;
  erSubjects: ExtractionSubject[] = [];
  fixed = false;
  isStupidSpec = false;
  types = [];
  degrees = [];

  printInfo: PrintInfo = {
    fFac_NameTaj: '',
    fFac_NameTajShort: '',
    fFac_Dekan: '',
    kf_full_name: '',
    kf_short_name: '',
    kf_chief: '',
    itm_chief: '',
    kfChiefPosition: ''
  };

  constructor(private extractionService: ExtractionService,
              private authService: AuthService,
              private dialog: MatDialog) {
    this.types = this.authService.TYPES;
    this.degrees = this.authService.DEGREES;
  }

  ngOnInit() {

    this.extractionService.getPrintInfo(this.idSpec).subscribe(resp => {
      if (!resp.error) {
        this.printInfo = resp.data;
      }
    });

    this.isStupidSpec = (
        (this.idSpec === 299 && this.Curriculum.course === 4) || (this.idSpec === 298 && this.Curriculum.course === 4)
    );

    this.extractionService.getSubjectsByExtractionId(this.Curriculum.id).subscribe(resp => {
      if (!resp.error) {
        resp.data.forEach(item => {

          const i = item.terms.split(',').indexOf(item.term.toString());

          if (i === -1) {
            this.error = true;
            this.erSubjects.push(item);
          } else {
            const credits = item.credits.toString().split(',')[i];
            const term = item.terms.toString().split(',')[i];
            const checkout_b = separateIfMoreThanOne(item.checkout_b, i);
            const checkout_diff = separateIfMoreThanOne(item.checkout_diff, i);
            const exam = separateIfMoreThanOne(item.exam, i);
            let kmd = separateIfMoreThanOne(item.kmd, i);

            if (exam !== kmd && exam !== '') { kmd = ''; }

            this.subjects.push({
              id: +item.id,
              name: item.name,
              idStSubject: +item.idStSubject,
              credits: +credits,
              terms: item.terms,
              term: +term,
              auditCredits: +item.auditCredits,
              course: +item.course,
              lessonHours: +item.lessonHours,
              kmroCredits: +item.kmroCredits,
              kmroHour: +item.kmroHour,
              exam,
              kmd,
              checkout_diff,
              checkout_b,
              courseProject: +item.courseProject,
              courseWork: +item.courseWork,
              workKont: +item.workKont,
              lkPlan: +item.lkPlan,
              lkTotal: +item.lkTotal,
              lbPlan: +item.lbPlan,
              lbTotal: +item.lbTotal,
              lb_subgroup: +item.lb_subgroup,
              prPlan: +item.prPlan,
              prTotal: +item.prTotal,
              smPlan: +item.smPlan,
              smTotal: +item.smTotal,
              advice: +item.advice,
              trainingPrac: +item.trainingPrac,
              manuPrac: +item.manuPrac,
              diplomPrac: +item.diplomPrac,
              bachelorWork: +item.bachelorWork,
              gosExam: +item.gosExam,
              total: this.total(item),
              kfName: item.kfName,
              selective: +item.selective
            });
          }
        });
      }
    });
  }

  getSubjectsByTerm(semester: number) {
    return this.subjects.filter(item => +item.term - (item.course - 1) * 2 === semester);
  }

  rowAmount(amount: number): number[] {
    return Array.from(Array(amount).keys());
  }

  deleteSubject(subject: ExtractionSubject) {
    if (subject.selective === 1 || this.isStupidSpec) {
      const i = this.subjects.indexOf(subject);

      const dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: '500px',
          data: {
            data: {
              name: this.subjects[i].name,
              curriculum: this.Curriculum.speciality
            },
            type: 'exSubjects'
          }
        });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.extractionService.deleteSubject(subject.id).subscribe((data) => {
            if (!data.error) {
              this.subjects.splice(i, 1);
            } else {
              console.error('Error has been happened while deleting subject');
            }
          });
        }
      });
    }
  }

  sum(prop, term?) {
    let sum = 0;
    let subjects;

    if (term) {
      subjects = this.getSubjectsByTerm(term);
    } else {
      subjects = this.subjects;
    }

    subjects.forEach(item => {
      switch (prop) {
        case 'credits': sum += item.credits; break;
        case 'auditCredits': sum += item.auditCredits; break;
        case 'lessonHours': sum += item.lessonHours; break;
        case 'kmroCredits': sum += item.kmroCredits; break;
        case 'kmroHour': sum += item.kmroHour; break;
        case 'lkPlan': sum += item.lkPlan; break;
        case 'lkTotal': sum += item.lkTotal; break;
        case 'lbPlan': sum += item.lbPlan; break;
        case 'lbTotal': sum += item.lbTotal; break;
        case 'prPlan': sum += item.prPlan; break;
        case 'prTotal': sum += item.prTotal; break;
        case 'smPlan': sum += item.smPlan; break;
        case 'smTotal': sum += item.smTotal; break;
        case 'trainingPrac': sum += item.trainingPrac; break;
        case 'manuPrac': sum += item.manuPrac; break;
        case 'total': sum += item.total; break;
      }
    });

    return +sum.toFixed(2);
  }

  total(subject: ExtractionSubject) {
    subject.total = (
        +subject.lkTotal +
        +subject.lkPlan +
        +subject.smTotal +
        +subject.smPlan +
        +subject.lbPlan +
        +subject.lbTotal +
        +subject.prPlan +
        +subject.prTotal +
        +subject.trainingPrac +
        +subject.manuPrac +
        +subject.kmroHour
    );

    return subject.total;
  }

  editSubject(subject: ExtractionSubject) {
      const dialogRef = this.dialog.open(AddExtractionSubjectComponent, {
        width: '645px',
        data: {
          data: {
            id: subject.id,
            name: subject.name,
            idStSubject: subject.idStSubject,
            credits: subject.credits,
            terms: subject.terms,
            term: subject.term,
            auditCredits: subject.auditCredits,
            course: subject.course,
            lessonHours: subject.lessonHours,
            kmroCredits: subject.kmroCredits,
            kmroHour: subject.kmroHour,
            exam: subject.exam,
            kmd: subject.kmd,
            checkout_b: subject.checkout_b,
            checkout_diff: subject.checkout_diff,
            courseProject: subject.courseProject,
            courseWork: subject.courseWork,
            workKont: subject.workKont,
            lkPlan: subject.lkPlan,
            lkTotal: subject.lkTotal,
            lbPlan: subject.lbPlan,
            lbTotal: subject.lbTotal,
            lb_subgroup: subject.lb_subgroup,
            prPlan: subject.prPlan,
            prTotal: subject.prTotal,
            smPlan: subject.smPlan,
            smTotal: subject.smTotal,
            advice: subject.advice,
            trainingPrac: subject.trainingPrac,
            manuPrac: subject.manuPrac,
            diplomPrac: subject.diplomPrac,
            bachelorWork: subject.bachelorWork,
            gosExam: subject.gosExam,
            total: subject.total,
            kfName: subject.kfName,
            selective: subject.selective,
            type: this.Curriculum.type,
            degree: this.Curriculum.degree,
            standardsYear: new Date(this.Curriculum.dateOfStandard).getFullYear()
          },
          add: false
        }
      });

      const iSub = this.subjects.findIndex( x => x.id === subject.id);

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.subjects.splice(iSub, 1, result);
        }
      });
  }

  isBntu() {
    return [1, 9].includes(+this.Curriculum.fcId);
  }

  print() {
    window.print();
  }
}
