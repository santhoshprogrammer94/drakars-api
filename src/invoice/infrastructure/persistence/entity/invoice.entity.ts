import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../common/infrastructure/entities/base-entity';
import { InvoiceStatus } from '../../../domain/types/invoice-status';
import { PaymentType } from '../../../domain/types/payment-type';

@Entity()
export class InvoiceEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: InvoiceStatus,
  })
  status: InvoiceStatus;

  @Column({
    type: 'enum',
    enum: PaymentType,
  })
  paymentType: PaymentType;

  @Column({
    type: 'date',
  })
  paymentDate: Date;
}
