import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,delay } from 'rxjs';
import { GetData } from '../models/IGetDtata';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getAllUserData(): Observable<GetData[]> {
    let getUrl = "https://localhost:44362/User/getAll";
    return this.http.get<GetData[]>(`${getUrl}`).pipe(delay(2000),map((res: any) => {
      return res.data
    }))
  }
}
