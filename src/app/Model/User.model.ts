import { EducationModal } from './Education.modal';
import { ExperienceModal } from './Experience.modal';
import { PersonalInfoModel } from './PersonalInfo.modal';
import { SocialMediaModal } from './SocialMedia.modal';
import { OrderListModel } from './OrderList.modal';

export interface UserModel {
  personalInfo: PersonalInfoModel;
  socialMedia: SocialMediaModal;
  education: EducationModal[];
  experience: ExperienceModal[];
  orderList: OrderListModel[];
}
