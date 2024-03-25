import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ComptaService } from './compta.service';
import { ComptaController } from './compta.controller';
import { ComptaModule } from './compta.module';
import { Compta, ComptaDocument } from './schemas/compta.schema';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../app.module';
import { CreateComptaDto } from './dto/create-compta.dto';
import { ValidationPipe } from '@nestjs/common';

describe('ComptaController', () => {
  let service: ComptaService;
  let controller: ComptaController;
  let mockComptaModel: Partial<Model<ComptaDocument>>;
  let result;

  beforeAll(async () => {    
    const moduleRef = await Test.createTestingModule({
        imports: [ComptaModule, AppModule],
        controllers: [ComptaController],
        providers: [ComptaService, {
          provide: getModelToken(Compta.name),
          useValue: mockComptaModel,
        }],
        
      }).compile();

      result = [
        { _id: '1', description: 'compta1', refModel: 0, refId: "ID_PROJECT",
         owner:1, status:1, commandDate: new Date(), deliveryDate: new Date(), price: {devise: 1} },
        { _id: '2', description: 'compta2', refModel: 0, refId: "ID_OTHER",
         owner:2, status:1, commandDate: new Date(), deliveryDate: new Date(), price: {devise: 1} },
         { _id: '3', description: 'compta3', refModel: 0, refId: "ID_OTHER",
         owner:1, status:1, price: {devise: 1} },
      ];

    service = moduleRef.get<ComptaService>(ComptaService);
    controller = moduleRef.get<ComptaController>(ComptaController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[SERVICE]-getAll', () => {
    it('should return an array of comptas', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(result);
      expect(await service.getAll()).toBe(result);
      expect(service.getAll).toHaveBeenCalledWith();
    });
  });

  describe('GET_COMPTAS', () => {
    it('should return an array of comptas by refModel and refId', async () => {
      jest.spyOn(service, 'getPurchasesByRef').mockResolvedValue(result[0]);
      const tmpResult = await controller.getPurchasesByIdRefModel({ refModel:"project",refId:"ID_PROJECT" });
      expect(tmpResult).toEqual(result[0]);
      expect(service.getPurchasesByRef).toHaveBeenCalledWith(0, "ID_PROJECT");
    });
  })

  describe('[SERVICE]-getOneById', () => {
    it('should return a compta', async () => {
      jest.spyOn(service, 'getOneById').mockResolvedValue(result[1]);
      expect(await service.getOneById("2")).toBe(result[1]);
      expect(service.getOneById).toHaveBeenCalledWith("2");
    });
  })

 

  describe('POST_COMPTA', () => {
    it('should create Compta', async () => {
      const newComptaData = {
        description: 'New Compta',
        refModel: 0,
        refId: 'ID_PROJECT',
        owner: 1,
        status: 1,
        commandDate: new Date(),
        deliveryDate: new Date(),
        price: { devise: 1, fulltaxPrice: 12, pretaxPrice:12 }
      };
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce({
        ...newComptaData 
      });
      const createdCompta = await controller.create(newComptaData);
      expect(createSpy).toHaveBeenCalledWith(newComptaData);
      expect(createdCompta).toEqual({...newComptaData});
    });
  })

  describe('PUT_COMPTA', () => {
    it('should update an existing compta', async () => {
      const updatedComptaData = {
        description: 'Updated Compta',
        refModel: 1,
        refId: 'ID_UPDATED',
        owner: 2,
        status: 2,
        commandDate: new Date(),
        deliveryDate: new Date(),
        price: 12
      };
  
      const updateSpy = jest.spyOn(service, 'update').mockResolvedValueOnce({
        _id: '2', 
        ...updatedComptaData
      });
      const updatedCompta = await controller.update( updatedComptaData, '2');
      expect(updateSpy).toHaveBeenCalledWith('2', updatedComptaData);
      expect(updatedCompta).toEqual({ _id: '2', ...updatedComptaData})
    });
  })

  describe('DELETE_COMPTA', () => {
    it('should delete compta with id 2', async () => {
      const deleteSpy = jest.spyOn(service, 'delete').mockResolvedValue({ acknowledged: true, deletedCount: 1 });
      const deletionResultResponse = await controller.delete("2");
      expect(deletionResultResponse).toEqual({ acknowledged: true, deletedCount: 1 });
      expect(deleteSpy).toHaveBeenCalledWith("2");
    });
  });
});