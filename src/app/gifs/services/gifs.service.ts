import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGIFResponse, Gift } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  public resultados: Gift[] = []
  token: string = ''

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient) {
      localStorage.getItem('historial')
      if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!) || []
      }
      if(localStorage.getItem('resultados')){
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
      }
   }



  buscarGifs (query: string) {
    query = query.trim().toLocaleLowerCase()
    this._historial = this._historial.splice(0, 10)
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
    }
    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.token}=${query}&limit=10`)
        .subscribe((response) => {
          this.resultados = response.data
          localStorage.setItem('resultados', JSON.stringify(this.resultados))  
        })
        localStorage.setItem('historial', JSON.stringify(this._historial))         
  }
}
