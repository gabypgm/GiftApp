import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gift } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  public resultados: Gift[] = []
  private token: string = ''
  private servicio_url = 'https://api.giphy.com/v1/gifs'

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

    const params = new HttpParams()
      .set('api_key', this.token)
      .set('q', query)
      .set('limit', 10)

    this.http.get<SearchGIFResponse>(`${this.servicio_url}/search`, {params})
      .subscribe((response) => {
          this.resultados = response.data
          localStorage.setItem('resultados', JSON.stringify(this.resultados))  
        })
        localStorage.setItem('historial', JSON.stringify(this._historial))         
  }
}
