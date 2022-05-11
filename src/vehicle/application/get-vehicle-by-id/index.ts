import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from '../../../lib/paginate';
import { VehicleEntity } from '../../infrastructure/persistence/entities/vehicle.entity';
import { VehicleMariadbRepository } from '../../infrastructure/persistence/repositories/vehicle.mariadb,repository';
import { AvailableVehicleDto } from '../../infrastructure/rest/dtos/available-vehicle';

@Injectable()
export class GetVehicleService {
  constructor(private readonly vehicleRepository: VehicleMariadbRepository) {}
  static PAGINATE_CONFIGURATION: PaginateConfig<VehicleEntity> = {
    sortableColumns: ['id', 'year', 'pricePerDay'],
    searchableColumns: ['fullName'],
    filterableColumns: {
      fuel: [FilterOperator.EQ],
      type: [FilterOperator.EQ],
      mark: [FilterOperator.EQ],
      pricePerDay: [FilterOperator.GT, FilterOperator.LT, FilterOperator.BTW],
      transmission: [FilterOperator.EQ],
      seats: [FilterOperator.GT],
      'office.id': [FilterOperator.EQ],
    },
    defaultLimit: 5000,
    maxLimit: 5000,
    defaultSortBy: [['id', 'ASC']],
  };

  listAvailable(query: AvailableVehicleDto & PaginateQuery) {
    const queryBuilder = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('vehicle')
      .leftJoin('vehicle.rents', 'rent')
      .where('vehicle.office=:office', { office: query.office })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            new Brackets((qb) => {
              qb.where('rent.endDate < :startDate', {
                startDate: query.startDate,
              }).orWhere('rent.startDate > :endDate', {
                endDate: query.endDate,
              });
            }),
          ).orWhere(
            new Brackets((qb) => {
              qb.where('rent.endDate is null').andWhere(
                'rent.startDate is null',
              );
            }),
          );
        }),
      );
    return paginate(query, queryBuilder, {
      ...GetVehicleService.PAGINATE_CONFIGURATION,
    });
  }

  getById(id: number) {
    return this.vehicleRepository.findOne(id, {
      //   relations: ['office', 'rents', 'ratings'],
    });
  }
}
