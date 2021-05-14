import { ContactDetail } from "./contactDetail";

export interface UserUpdateSend{
    userName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    contactDetail: ContactDetail;
}