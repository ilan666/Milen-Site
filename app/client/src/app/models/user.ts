export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public token: string
  ) {}

  // get token() {} By Exp date feature
}
