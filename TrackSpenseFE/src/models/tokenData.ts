export class TokenData {
  Id!: number;
  UserName!: string;
  Email!: string;

  constructor(Id: number, UserName: string, Email: string) {
    this.Id = Id;
    this.UserName = UserName;
    this.Email = Email;
  }
}
