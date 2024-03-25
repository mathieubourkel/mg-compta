import { Prop } from "@nestjs/mongoose"
import { DeviseEnum } from "../enums/devise.enum"

export class Price {
    @Prop()
    fulltaxPrice? :number
    @Prop()
    pretaxPrice? :number
    @Prop({type: ()=> DeviseEnum, required:true})
    devise: DeviseEnum
}