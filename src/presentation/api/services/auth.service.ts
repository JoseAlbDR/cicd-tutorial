import { UserModel } from '../../../data';
import { CustomError, LoginDto, SignupDto } from '../../../domain';

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

  public async login(loginDto: LoginDto) {
    try {
      const user = await UserModel.findOne({ email: loginDto.email });
      if (!user) throw CustomError.unauthorized('Incorrect email or password');

      const isMatch = user.checkPassword(loginDto.password);
      if (!isMatch)
        throw CustomError.unauthorized('Incorrect email or password');

      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
