export interface User {
  id: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  registerDate: Date;
  modifyDate: Date;
  city: string;
  country: string;
  photoUrl: string;
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  userPhoto?: Photo[];
}

export interface Photo {
  id: number;
  url: string;
  description: string;
  registerDate: Date;
  isMain: boolean;
}

export class UserSearchParam {
  gender: string;
  minAge: number;
  maxAge: number;
  orderBy: string;
  like: boolean;
}
