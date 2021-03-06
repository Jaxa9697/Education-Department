/**
 * Authorization interfaces
 */
export interface UserInfo {
  userId: number;
  type: string;
  time: string;
}

export interface IAuth {
  error: boolean;
  data: {
    token?: string
    hash?: string
  };
}

export interface CheckResponse {
  error: boolean;
  data: {
    last_action: string;
  };
}

/**
 * Common http responses
 */

export interface ResponseAdd {
  error: boolean;
  data: {
    id: number
  };
}

export interface UpdateResponse {
  error: boolean;
}

/**
 * Speciality interfaces
 */

export interface ISpec {
  error: boolean;
  data: [ISpec];
}

export interface ISpec {
  fID: number;
  fcId: number;
  kfId: number;
  fSpec_NameRus: string;
  fSpec_NameTaj: string;
  fSpec_Shifr: string;
}

export class Spec {
  constructor(
    public fID: number,
    public fSpec_NameRus: string,
    public fSpec_NameTaj: string,
    public fcId: number,
    public kfId: number,
    public fSpec_Shifr: string
  ) { }
}

/**
 * Subjects interfaces
 */

export interface ISubject {
  id: number;
  number: number;
  name_tj: string;
  name_ru: string;
  shortname_tj: string;
  shortname_ru: string;
  isArch: number;
  removable: number;
}

export interface SubjectResponse {
  error: boolean;
  data: [ISubject];
}

export interface TypesOfStudying {
  id: number;
  name: string;
}

/**
 *  FILTER REPORTS
 */

export interface FilterReport {
  mainFilter: string;
  type: number;
  duration: number;
}
