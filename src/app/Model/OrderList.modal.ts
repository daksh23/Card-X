import { CardDesignModel } from 'src/app/Model/CardDesign.model';

export interface OrderListModel {
 
    order_id:string;

    payerId:string;

    paymentId:string;

    paymentDetails:string;

    cardDetails:CardDesignModel;

    date_time:string;

}