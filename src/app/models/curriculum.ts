/**
 * Curriculum interfaces
 */
import {IStSubjectResp} from './standards';

export interface CurriculumList {
  id: number;
  number: number;
  kfId: number;
  fcId: number;
  speciality: string;
  course: number;
  degree: string;
  type: string;
  educationYear: string;
  idStandard: number;
  dateOfStandard: Date;
  locked: number;
}

export interface ICurriculumList {
  error: boolean;
  data: [CurriculumList];
}

export interface ExtractionSubject extends Pick<IStSubjectResp, 'checkout_b' | 'checkout_diff'>{
  id: number;
  name: string;
  idStSubject: number;
  terms: string;
  term: number;
  credits: number;
  auditCredits: number;
  course: number;
  lessonHours: number;
  kmroCredits: number;
  kmroHour: number;
  exam: string;
  kmd: string;
  courseProject: number;
  courseWork: number;
  workKont: number;
  lkPlan: number;
  lkTotal: number;
  lbPlan: number;
  lbTotal: number;
  lb_subgroup: number;
  prPlan: number;
  prTotal: number;
  smPlan: number;
  smTotal: number;
  advice: number;
  trainingPrac: number;
  manuPrac: number;
  diplomPrac: number;
  bachelorWork: number;
  gosExam: number;
  total: number;
  kfName: string;
  selective: number;
}

export interface ResponseExtractionSubject {
  error: boolean;
  data: [ExtractionSubject];
}

export interface PrintInfo {
  fFac_NameTaj: string;
  fFac_NameTajShort: string;
  fFac_Dekan: string;
  kf_full_name: string;
  kf_short_name: string;
  kf_chief: string;
  itm_chief: string;
  kfChiefPosition: string;
}

export interface PrintInfoResp {
  error: boolean;
  data: PrintInfo;
}
