import { DomainModel } from '@core/base/domain-model';

export class User extends DomainModel {
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    super(id);
    this.email = email;
    this.password = password;
    this.updatedAt = updatedAt || new Date();
    this.createdAt = createdAt || new Date();
  }
}
