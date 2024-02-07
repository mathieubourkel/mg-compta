import { Prop } from "@nestjs/mongoose"
import { DeviseEnum } from "../enums/devise.enum"

export class Price {
    @Prop()
    fulltaxPrice :number
    @Prop()
    pretaxPrice :number
    @Prop({ required: true })
    devise: DeviseEnum
}