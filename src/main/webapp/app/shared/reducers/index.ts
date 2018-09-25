import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import student, {
  StudentState
} from 'app/entities/student/student.reducer';
// prettier-ignore
import contactInformation, {
  ContactInformationState
} from 'app/entities/contact-information/contact-information.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import province, {
  ProvinceState
} from 'app/entities/province/province.reducer';
// prettier-ignore
import entreprise, {
  EntrepriseState
} from 'app/entities/entreprise/entreprise.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import teacher, {
  TeacherState
} from 'app/entities/teacher/teacher.reducer';
// prettier-ignore
import cohort, {
  CohortState
} from 'app/entities/cohort/cohort.reducer';
// prettier-ignore
import offer, {
  OfferState
} from 'app/entities/offer/offer.reducer';
// prettier-ignore
import studentOffer, {
  StudentOfferState
} from 'app/entities/student-offer/student-offer.reducer';
// prettier-ignore
import interview, {
  InterviewState
} from 'app/entities/interview/interview.reducer';
// prettier-ignore
import internship, {
  InternshipState
} from 'app/entities/internship/internship.reducer';
// prettier-ignore
import document, {
  DocumentState
} from 'app/entities/document/document.reducer';
// prettier-ignore
import documentType, {
  DocumentTypeState
} from 'app/entities/document-type/document-type.reducer';
// prettier-ignore
import technology, {
  TechnologyState
} from 'app/entities/technology/technology.reducer';
// prettier-ignore
import offerType, {
  OfferTypeState
} from 'app/entities/offer-type/offer-type.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly student: StudentState;
  readonly contactInformation: ContactInformationState;
  readonly country: CountryState;
  readonly province: ProvinceState;
  readonly entreprise: EntrepriseState;
  readonly employee: EmployeeState;
  readonly teacher: TeacherState;
  readonly cohort: CohortState;
  readonly offer: OfferState;
  readonly studentOffer: StudentOfferState;
  readonly interview: InterviewState;
  readonly internship: InternshipState;
  readonly document: DocumentState;
  readonly documentType: DocumentTypeState;
  readonly technology: TechnologyState;
  readonly offerType: OfferTypeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  student,
  contactInformation,
  country,
  province,
  entreprise,
  employee,
  teacher,
  cohort,
  offer,
  studentOffer,
  interview,
  internship,
  document,
  documentType,
  technology,
  offerType,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
