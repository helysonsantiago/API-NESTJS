import { Injectable, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado...');
    const passMatched = await argon.verify(user.password, dto.password);

    if (!passMatched)
      throw new ForbiddenException(
        'Ops, Senha ou email inválido, verifique as informações e tente novamente.',
      );

    const secret = process.env.JWT_SECRET;
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
    });

    //Delete info of response
    delete user.updatedAt;
    delete user.password;
    delete user.createdAt;
    delete user.id;

    return {
      user,
      auth: token,
    };
  }
}
