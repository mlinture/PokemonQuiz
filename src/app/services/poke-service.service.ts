import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokedata } from '../data/poke-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http:HttpClient) { }

  private sendRequest(dexNum:string):Promise<any> {
    return firstValueFrom(this.http.get(this.apiUrl + dexNum)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  async generateMon(randomNum:string):Promise<Pokedata> {
    return await this.sendRequest(randomNum).then((data) => {
      return new Pokedata(data);
    }).catch((error) => {
      console.error(error);
      throw new Error('Failed to fetch Pokemon data.');
    });
  }
}
