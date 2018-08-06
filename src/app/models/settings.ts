export interface Exam {
  bachelor: number;
  masters: number;
  distance: number;
}

export class ICoefficient {
  exam: Exam = {
    bachelor: 0,
    masters: 0,
    distance: 0
  };
  courseWork: number;
  courseProject: number;
  graphicWork: number;
  controlWork: number;
  gosExam: number;
  diplomPrac: number;
  graduateWork: number;
  checkout: number;

  constructor(settings: Settings[]) {
    settings.forEach(o => {
      switch (o.key) {
        case 'exam': this.exam.bachelor = +o.value; break;
        case 'courseWork': this.courseWork = +o.value; break;
        case 'courseProject': this.courseProject = +o.value; break;
        case 'graphicWork': this.graphicWork = +o.value; break;
        case 'mastersExam': this.exam.masters = +o.value; break;
        case 'controlWork': this.controlWork = +o.value; break;
        case 'distanceExam': this.exam.distance = +o.value; break;
        case 'gosExam': this.gosExam = +o.value; break;
        case 'diplomPrac': this.diplomPrac = +o.value; break;
        case 'graduateWork': this.graduateWork = +o.value; break;
        case 'checkout': this.checkout = +o.value; break;
      }
    });
  }
}

export interface Settings {
  id: number;
  key: string;
  value: number;
  definition: string;
  isChanged: boolean;
}

export interface SettingsResp {
  error: boolean;
  data: [Settings];
}
