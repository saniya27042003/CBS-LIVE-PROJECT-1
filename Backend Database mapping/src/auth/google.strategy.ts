// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '88055241900-4sqs2cg7jjekltbm0sssu53tjg58gibs.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      // extra OAuth parameters go here
      authorizationParams: {
        prompt: 'select_account',
        access_type: 'offline',
      },
    } as StrategyOptions);
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    let picture = profile.photos?.[0]?.value;

    if (picture && picture.includes('=s96-c')) {
      picture = picture.replace('=s96-c', '=s256-c');
    }

    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      picture,
    };
  }
}
