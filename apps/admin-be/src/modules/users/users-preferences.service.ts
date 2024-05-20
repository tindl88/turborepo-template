import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { User } from './entities/user.entity';
import { UserPreference } from './entities/user-preference.entity';

@Injectable()
export class UsersPreferencesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPreference)
    private readonly userPreferenceRepository: Repository<UserPreference>
  ) {}

  async updateReference(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    if (_.isEmpty(updateUserPreferenceDto)) {
      throw new BadRequestException('Data should not be empty');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { preference: true }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.preference?.id) {
      await this.userPreferenceRepository.save(updateUserPreferenceDto);
    } else {
      await this.userPreferenceRepository.update(user.preference.id, updateUserPreferenceDto);
    }

    this.userRepository.merge(user, { preference: updateUserPreferenceDto });

    return this.userRepository.save(user);
  }
}
