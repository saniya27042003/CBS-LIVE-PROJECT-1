import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google-login')
  googleLogin(@Res() res: Response) {
    // Generate Google OAuth URL and redirect
    const url = this.authService.getGoogleAuthURL();
    return res.redirect(url);
  }

  @Get('google-callback')
async googleCallback(@Req() req: Request, @Res() res: Response) {
  try {
    const code = req.query.code as string;
    if (!code) {
      console.error('Google callback: missing code in query');
      return res.status(400).send('Missing code');
    }

    const profile = await this.authService.getGoogleProfile(code);
    const { token } = await this.authService.loginWithGoogleProfile(profile);

    return res.redirect(`http://localhost:4200/database?token=${token}`);
  } catch (err) {
    console.error('Google Callback Error (detailed):', err);
    // return a simple JSON so browser shows the error and you see it in devtools
    return res.status(500).json({
      message: 'Callback failed',
      error: err?.message || err,
    });
  }
}
}