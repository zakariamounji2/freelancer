import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    // Inject the Repository tool for the User table
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUserAndGenerateToken(email: string, pass: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return `mock-jwt-for-user-${user.id}`;
  }
}
