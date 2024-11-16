import { AddressModal } from "./Address.modal";

export interface ExperienceModal {
  job: string;
  present: boolean;
  exStart: string;
  exEnd: string;
  companyName: string;
  address: AddressModal[];
}