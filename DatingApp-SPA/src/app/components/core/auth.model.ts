export class Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  password: string;
  knownAs: string;
  dateOfBirth: Date;
  city: string;
  country: string;
  gender: string;
}
