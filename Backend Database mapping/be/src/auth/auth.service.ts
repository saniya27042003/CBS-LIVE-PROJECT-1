import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class AuthService {
  private redirectUri: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
    this.redirectUri = 'http://localhost:3000/auth/google-callback';
    
  console.log('GOOGLE_CLIENT_ID=', this.config.get<string>('GOOGLE_CLIENT_ID'));
  console.log('GOOGLE_CLIENT_SECRET=', !!this.config.get<string>('GOOGLE_CLIENT_SECRET') ? 'SET' : 'MISSING');
  
  }

  // Generate Google OAuth consent URL
  getGoogleAuthURL(): string {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: this.redirectUri,
      client_id: this.config.get<string>('GOOGLE_CLIENT_ID'),
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    return `${rootUrl}?${querystring.stringify(options)}`;
  }

  // Exchange code for access token and get Google profile
  async getGoogleProfile(code: string) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: this.config.get<string>('GOOGLE_CLIENT_ID'),
      client_secret: this.config.get<string>('GOOGLE_CLIENT_SECRET'),
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code',
    };

  try {

    const res = await axios.post(url, querystring.stringify(values), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const accessToken = res.data.access_token;

    const profileRes = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return profileRes.data; // { id, email, name, picture }
  
  } catch (error) {

     console.error('--- GOOGLE AUTH ERROR START ---');
    if (error?.response?.data) {
      console.error('Google response data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Axios error message:', error.message);
      console.error('Axios error full:', error);
    }
    console.error('--- GOOGLE AUTH ERROR END ---');

    // rethrow a descriptive error so controller returns it
    const msg = error?.response?.data?.error_description || error?.response?.data?.error || error.message;
    throw new Error(`Google authorization failed: ${msg}`);
  }
 }


  // Find/create user and generate JWT
  async loginWithGoogleProfile(profile: any) {
    let user = await this.usersService.findByGoogleId(profile.id);

    if (!user) {
      const existingUser = await this.usersService.findByEmail(profile.email);
      if (existingUser) {
        existingUser.googleId = profile.id;
        user = await this.usersService.update(existingUser.id, existingUser);
      } else {
        user = await this.usersService.createGoogleUser({
          googleId: profile.id,
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
        });
      }
    }

    if (!user) {
        throw new Error('User not found after login');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user };
  }
}
