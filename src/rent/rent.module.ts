import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetOfficeService } from '../office/application/get-by-id';
import { OfficeEntity } from '../office/infrastructure/persistence/entity/office.entity';
import { OfficeRepository } from '../office/infrastructure/persistence/repository/office.mariadb.repository';
import { FindOrCreateClientService } from '../user/application/client/find-or-create';
import { ClientEntity } from '../user/infrastructure/persistence/entity/client.entity';
import { ClientRepository } from '../user/infrastructure/persistence/repository/client.repository';
import { GetVehicleService } from '../vehicle/application/get-vehicle-by-id';
import { VehicleEntity } from '../vehicle/infrastructure/persistence/entities/vehicle.entity';
import { VehicleMariadbRepository } from '../vehicle/infrastructure/persistence/repositories/vehicle.mariadb,repository';
import { RentCarService } from './application/rent-car';
import { RentEntity } from './infrastructure/persistence/entity/rent.entity';
import { RentRepository } from './infrastructure/persistence/repository/rent.repository';
import { RentController } from './infrastructure/rest/rent.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RentEntity,
      RentRepository,
      VehicleEntity,
      VehicleMariadbRepository,
      ClientRepository,
      ClientEntity,
      OfficeRepository,
      OfficeEntity,
    ]),
  ],
  providers: [
    RentCarService,
    FindOrCreateClientService,
    GetVehicleService,
    GetOfficeService,
  ],
  controllers: [RentController],
})
export class RentModule {}
