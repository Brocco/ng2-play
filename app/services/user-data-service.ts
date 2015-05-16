/// <reference path="../../typings/tsd" />

export class UserDataService {
  constructor() { }

  public getUsers(): IUser[] {
    return [
      { name: 'mike', email: 'mike@mail.com' }, 
      { name: 'john', email: 'john@mail.com' }, 
      { name: 'dave', email: 'dave@mail.com' }];
  }
}

export interface IUser {
  name: string;
  email: string;
}