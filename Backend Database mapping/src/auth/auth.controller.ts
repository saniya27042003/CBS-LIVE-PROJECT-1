// src/auth/auth.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const user = req.user;

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture
    });

    const redirectUrl =
      `http://localhost:4200/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;

    return res.redirect(redirectUrl);
  }
}
