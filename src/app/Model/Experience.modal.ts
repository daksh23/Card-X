import { AddressModal } from "./Address.modal";

export interface ExperienceModal {
  job: string;
  companyName: string;
  start: string;
  end: string;
  present: boolean;
  address: AddressModal[];
}