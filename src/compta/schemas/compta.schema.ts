import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose"
import { ComptaStatusEnum } from "../../enums/compta.enum";

export type ComptaDocument = HydratedDocument<Compta>

@Schema({collection: "compta", timestamps: true})
export class Compta {

    @Prop({required: true})
    name:string

    @Prop({required:true})
    ref: string

    @Prop({required:true, default: ComptaStatusEnum.PENDING})
    status: ComptaStatusEnum

    @Prop()
    price: number

    @Prop()
    commandDate: Date

    @Prop()
    deliveryDate: Date

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    // project: Project
    
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
    // owner: Owner[];

}

export const ComptaSchema = SchemaFactory.createForClass(Compta)