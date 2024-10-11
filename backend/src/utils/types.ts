

export type UserType = {
  id: string;
  email: string;
  firstName: string | null
  lastName: string | null
  password: string;
  createdAt: Date;
  updatedAt: Date;
  accountType: string
} | null;
