export interface User {
  _id: string;
  name: string;
  userName: string;
  email: string;
  profilePic: string | null;
  password: string;
  isActive: boolean;
}
