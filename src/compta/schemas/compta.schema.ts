import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import { Price } from "../class/price.class";
import { StatusEnum } from "../enums/status.enum";
import { PaymentStatusEnum } from "../enums/paymentStatus.enum";
import { TypeEnum } from "../enums/type.enum";
import { ModelEnum } from "../enums/model.enum";

export type ComptaDocument = HydratedDocument<Compta>

@Schema({collection: "compta", timestamps: true})
export class Compta {

    @Prop({required: true, default:ModelEnum.project})
    refModel:ModelEnum

    @Prop({required:true})
    refId: string

    @Prop({required:true})
    creator: string   // // objectId MS-AUTH

    @Prop({required:true})
    description: string

    @Prop({type: Price, required: true})
    price : Price

    @Prop()
    commandOwner: string   // objectId MS-AUTH

    @Prop()
    status: StatusEnum

    @Prop()
    payment: PaymentStatusEnum

    @Prop()
    type: TypeEnum

    @Prop()
    medias: string[]

    @Prop()
    commandDate: Date

    @Prop()
    paymentDate: Date

    @Prop()
    deliveryDate: Date

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    // project: Project
    
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
    // owner: Owner[];

}

export const ComptaSchema = SchemaFactory.createForClass(Compta)