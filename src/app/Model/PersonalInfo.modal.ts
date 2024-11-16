import { AddressModal } from "./Address.modal";
import { CredentialsModel } from "./CredentialsModel.model";

export interface PersonalInfoModel {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  bio:string;
  address:AddressModal;
  image: string;
  password: string;
  confirmPassword: string;
  credential:CredentialsModel;
}
