import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity'; // We will create this next

@Module({
  imports: [
    // Connect NestJS to your database container
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db', // Name of your DB service in docker-compose
      port: 3306,
      username: 'zakaria', // From your bash script
      password: '1234',    // From your bash script
      database: 'freelancer', // From your bash script
      entities: [User],
      synchronize: true, // Auto-creates database tables based on your code entities
    }),
    // Inject the User entity wrapper into our current module scope
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
