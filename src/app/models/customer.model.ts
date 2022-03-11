import { TimologiakiPolitiki } from './timologiaki-politiki.model';

export interface Customer {
  id: number;
  username: string;
  password: string;
  timol_pol: TimologiakiPolitiki
}

export class User {
  constructor(
    public email: string, 
    public id: string, 
    private _token: string, 
    private _tokenExpiirationDate: Date
    ){}

    get token(){
      if(!this._tokenExpiirationDate || new Date() > this._tokenExpiirationDate){
        return null;
      }
        return this._token;
    }
}