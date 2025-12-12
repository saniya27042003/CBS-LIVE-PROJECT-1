// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '88055241900-4sqs2cg7jjekltbm0sssu53tjg58gibs.apps.googleusercontent.com',          // <-- REPLACE
      clientSecret: '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',  // <-- REPLACE
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      prompt: 'select_account', 
      accessType: 'offline'
    });
  }

async validate(accessToken: string, refreshToken: string, profile: any) {
  let picture = profile.photos[0].value;

  // 🔥 Fix Chrome blocked image URL
  if (picture.includes("=s96-c")) {
    picture = picture.replace("=s96-c", "=s256-c");
  }

  return {
    email: profile.emails[0].value,
    name: profile.displayName,
    picture
  };
}

}
