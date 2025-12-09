import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async findByGoogleId(googleId: string) {
    return this.userRepo.findOne({ where: { googleId } });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async createGoogleUser(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.userRepo.findOne({ where: { id } });
  }
}
