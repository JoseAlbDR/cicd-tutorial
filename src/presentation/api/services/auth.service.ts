import { UserModel } from '../../../data';
import { CustomError } from '../../../domain';
import { SignupDto } from '../../../domain/dtos/auth/signup.dto';

export class AuthService {
  constructor() {}

  public async signup(signupDto: SignupDto) {
    try {
      const userExist = await UserModel.findOne({ email: signupDto.email });

      if (userExist)
        throw CustomError.badRequest('Email already exists, try another one');

      const user = new UserModel(signupDto);
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  public async login() {}
}
