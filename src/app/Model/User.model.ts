import { AddressModal } from './Address.modal';
import { EducationModal } from './Education.modal';
import { ExperienceModal } from './Experience.modal';
import { PersonalInfoModel } from './personalInfo.modal';

export interface UserModel {
  personalInfo: PersonalInfoModel[];
  address: AddressModal[];
  education: EducationModal[];
  experience: ExperienceModal[];
}
