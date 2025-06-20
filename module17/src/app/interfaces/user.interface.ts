export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPER-ADMIN";
  age: number;
}
