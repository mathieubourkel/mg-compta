import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Next, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { ComptaService } from './compta.service';
import { CreateComptaDto } from './dto/compta.dto';
import { Observable, of } from 'rxjs';

@Controller('compta')
export class ComptaController {

    constructor(private readonly comptaService: ComptaService) {}

//     @Get()
//     async getPurchasesByIdProject(@Req() req:any, @Next() next:any):string{
//         try {
//             const searchOptions = { project: { id: +req.params.idProject } };
//             const result:Array<ComptaEntity> = await this.proceedCache<Array<ComptaEntity>>(CacheEnum.PURCHASES, async () => await this.comptaService.getManyBySearchOptions(searchOptions, ["project","project.owner", "project.users"],cleanResDataPurchases), {params: req.params.idProject});
//             if (!result) throw new CustomError("PC-NO-EXIST", 404)
//             if (result.length === 0) return result
//             if (result[0].project.owner.id !== req.user.userId && !result[0].project.users.find((user: { id: number }) => user.id === req.user.userId)) throw new CustomError("PurcC-NO-RIGHTS", 403);
//             return result;
//         } catch (error) {
//             throw new BadRequestException()
//         }
//   }

    @Post()
    create(
        @Body(new ValidationPipe()) createCompta:CreateComptaDto) {
            try {
                return this.comptaService.create(createCompta)
            } catch (error) {
                throw new InternalServerErrorException()
            }
        }

    // @Put()
    // update(@Req() req:any, @Next() next:any):Observable<{}>{

    //     try {
    //         const result = await this.comptaService.getOneById<PurchaseEntity>(+req.params.id, ["project", "project.owner"], cleanResDataPurchaseForDel);
    //   if (!result) throw new BadRequestException()
    //   if (result.project.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
    // //   this.delCache(CacheEnum.PURCHASES, {params: result.project.id})
    // //   this.delCache(CacheEnum.PURCHASE, {params: result.id})
    //   return of (this.comptaService.delete(result.id))
    //     } catch (error) {
    //         throw new BadRequestException()
    //     }
        
    // }

    // @Delete()
    // async delete(@Req() req:any, @Next() next:any):Observable<{}>{

    //     try {
    //         const result:PurchaseEntity = await this.purchaseService.getOneById<PurchaseEntity>(+req.params.id, ["project", "project.owner"], cleanResDataPurchaseForDel);
    //         if (!result) throw new CustomError("PC-PURC-NOTFIND", 400);
    //         if (result.project.owner.id !== req.user.userId) throw new CustomError("PC-NO-RIGHTS", 403);  
    //         this.delCache(CacheEnum.PURCHASES, {params: result.project.id})
    //         this.delCache(CacheEnum.PURCHASE, {params: result.id})
    //         return of (this.purchaseService.delete(result.id))
    //     } catch (error) {
    //         throw new BadRequestException()
    //     }
    // }
}