import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';

import { checkValidPassword } from '@/common/utils/password.util';

import { USER_GET_FIELDS, USER_STATUS } from './constants/user.constant';
import { BulkDeleteUserDto } from './dto/bulk-delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserCreatedEvent } from './events/user-created.event';
import { UserUpdatedEvent } from './events/user-updated.event';

import { AUTH_PROVIDER } from '../auth/constants/auth.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    const response = await this.userRepository.save(user);

    const userCreatedEvent = new UserCreatedEvent();

    userCreatedEvent.userDto = createUserDto;
    userCreatedEvent.user = response;

    this.eventEmitter.emit('user.created', userCreatedEvent);

    return response;
  }

  async find(filterDto: FilterUserDto) {
    const { q, order, status, sort } = filterDto;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.select(USER_GET_FIELDS);

    if (status) queryBuilder.where('user.status in (:...status)', { status });
    if (q) {
      queryBuilder.andWhere('LOWER(user.email) LIKE LOWER(:email)', { email: `%${q}%` });
    }
    if (sort) {
      queryBuilder.orderBy(`user.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (order) {
      queryBuilder.orderBy('user.createdAt', order.toUpperCase() as 'ASC' | 'DESC');
    }
    queryBuilder.skip(filterDto.skip).take(filterDto.limit);

    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationDto = new PaginationDto({ totalItems, filterDto });

    return new PaginationResponseDto(entities, { paging: paginationDto });
  }

  async findOne(id: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.select(USER_GET_FIELDS);
    queryBuilder.where('user.id = :id', { id });

    const user = await queryBuilder.getOne();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findActiveUser(id: string) {
    const user = await this.userRepository.findOneBy({ id, status: USER_STATUS.ACTIVE });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { preference: true }
    });

    return user;
  }

  async findByOAuthAccount(provider: AUTH_PROVIDER, providerAccountId: string) {
    const user = await this.userRepository.findOneBy({ provider, providerAccountId });

    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const isValidPassword = await checkValidPassword(user.password, password);

    if (!isValidPassword) return null;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id: id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.deviceTokens) user.deviceTokens = [];
    if (!user.deviceTokens.includes(updateUserDto.deviceToken)) {
      user.deviceTokens.push(updateUserDto.deviceToken);
    }

    const response = await this.userRepository.save(user);

    const userUpdatedEvent = new UserUpdatedEvent();

    userUpdatedEvent.userDto = updateUserDto;
    userUpdatedEvent.user = response;

    this.eventEmitter.emit('user.updated', userUpdatedEvent);

    return response;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = USER_STATUS.DELETED;

    return this.userRepository.save(user);
  }

  async getAllDeviceTokens() {
    const users = await this.userRepository.createQueryBuilder('user').select('user.deviceTokens').getMany();
    const deviceTokens = users.flatMap(user => user.deviceTokens);

    return deviceTokens;
  }

  async bulkDelete(bulkDeleteUserDto: BulkDeleteUserDto) {
    const queryBuilder = this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: USER_STATUS.DELETED })
      .whereInIds(bulkDeleteUserDto.ids);
    const data = await queryBuilder.returning('id, status').execute();

    return data.raw;
  }
}
