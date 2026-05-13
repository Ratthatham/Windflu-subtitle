export type UserPlan = "free" | "starter" | "pro" | "enterprise";

export interface User {
  id: string;
  email: string;
  plan: UserPlan;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithPassword extends User {
  passwordHash: string;
}
