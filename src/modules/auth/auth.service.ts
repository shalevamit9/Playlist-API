/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ILoginCredentials, ISignupCredentials } from './auth.interface.js';
import userRepository from '../user/user.repository.js';
import { ICreateUserDto } from '../user/user.interface.js';

const { APP_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } =
  process.env;

class AuthService {
  private generateAccessToken(payload: any) {
    return jwt.sign(payload, APP_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRATION
    });
  }

  private generateRefreshToken(payload: any) {
    return jwt.sign(payload, APP_SECRET as string, {
      expiresIn: REFRESH_TOKEN_EXPIRATION
    });
  }

  private generateTokens(payload: any) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  async signup(credentials: ISignupCredentials) {
    // optional - check if email already exists in DB
    const existingUser = await userRepository.getUserByEmail(credentials.email);
    if (!existingUser) return null;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(credentials.password, salt);

    const userPayload: ICreateUserDto = {
      email: credentials.email,
      password: hashedPassword,
      playlists: []
    };
    const user = await userRepository.createUser(userPayload);

    const tokens = this.generateTokens({ userId: user._id });

    await userRepository.updateUser(user._id, {
      refreshToken: tokens.refreshToken
    });

    return tokens;
  }

  async login(credentials: ILoginCredentials) {
    const { email, password } = credentials;

    const user = await userRepository.getUserByEmail(email);
    if (!user) return false;

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return false;

    const tokenPayload = { userId: user._id };
    const tokens = this.generateTokens(tokenPayload);

    await userRepository.updateUser(user._id, {
      refreshToken: tokens.refreshToken
    });

    return tokens;
  }

  async logout(userId: string) {
    const user = await userRepository.updateUser(userId, {
      refreshToken: null
    });
    return user;
  }

  async getAccessToken(refreshToken: string) {
    if (!refreshToken) return null;

    let decoded;
    try {
      decoded = await jwt.verify(refreshToken, APP_SECRET as string);
    } catch (err) {
      return null;
    }

    const { userId } = decoded;
    const user = await userRepository.getUserById(userId);
    if (!user) return null;

    if (user.refreshToken !== refreshToken) return null;

    const accessToken = this.generateAccessToken({ userId });

    return accessToken;
  }
}

const authService = new AuthService();

export default authService;
