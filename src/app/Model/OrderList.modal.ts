import { CardDesignModel } from 'src/app/Model/CardDesign.model';

export interface OrderListModel {
 
    payerId:string;

    paymentId:string;

    paymentDetails:string;

    cardDesigns:CardDesignModel;
}