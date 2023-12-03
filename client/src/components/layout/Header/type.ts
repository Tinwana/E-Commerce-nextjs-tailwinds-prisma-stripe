export type SafeUser = {
  createAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
} | null;
