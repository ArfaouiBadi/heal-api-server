import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { signUpDto } from './Dto/signUp.Dto';
import { AuthDto } from './Dto/auth.Dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: signUpDto) {
    console.log(dto);
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (userExists) throw new ForbiddenException('Credentials taken');

      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          address: dto.address,
          phone: dto.phone,
          plan: {
            connect: {
              id: '65bec7b8740ece4ad2d9efe8',
            },
          },
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        plan: {
          select: {
            name: true,
          },
        },
      },
    });

    delete user.createdAt;
    delete user.updatedAt;
    delete user.planId;
    delete user.phone;
    delete user.address;
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);

    delete user.password;
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    const token = await this.signToken(user.id, user.email);
    return { ...token, user: user };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string; userId: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
      userId: userId,
    };
  }
}
