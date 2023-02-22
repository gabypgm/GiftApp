import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  public resultados: any[] = []
  token: string = ''

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient) { }



  buscarGifs (query: string) {
    query = query.trim().toLocaleLowerCase()
    this._historial = this._historial.splice(0, 10)
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
    }
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.token}=${query}&limit=10`)
        .subscribe((response: any) => {
          console.log(response.data)
          this.resultados = response.data
        })
    
    console.log(this._historial)
  }


}
