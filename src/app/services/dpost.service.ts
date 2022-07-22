import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, concatMap, delay, map, retry, scan, share, shareReplay, tap, filter } from 'rxjs/operators';
import { CrudAction, GetData } from '../models/IGetDtata';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class DpostService {

  updateDatas: any;

  userList$: Observable<GetData[]> = this.http.get<GetData[]>("https://localhost:44362/User/getAll").pipe(
    // delay(2000),
    tap(data => {
      this.loader.hideLoader()
    }),
    map((res: any) => {
      return res.data
    }),
    // catchError(this.handleError),
    shareReplay(1),
    //  share()
  );

  getIDsubject = new Subject<any>();
  getIdSubject$ = this.getIDsubject.asObservable();

  constructor(private http: HttpClient, private loader: LoaderService) { }

  setSubjectID(id: number) {
    this.getIDsubject.next(id);
  }

  private postCrudSubject = new Subject<CrudAction<GetData>>();
  postCrudSubject$ = this.postCrudSubject.asObservable();

  addUser(post: GetData) {
    this.postCrudSubject.next({ action: "add", data: post });
  }
  updateUser(post: GetData) {
    this.postCrudSubject.next({ action: "update", data: post });
  }

  deleteUser(post: GetData) {
    this.postCrudSubject.next({ action: "delete", data: post });
  }

  setData(data: any) {
    this.updateDatas = data;
  }
  sendData() {
    return this.updateDatas
  }


  allusersList$ = merge(
    this.userList$,
    this.postCrudSubject$.pipe(concatMap((postAction) =>
      this.savePost(postAction).pipe(
        map((datas) => ({ ...postAction, data: datas}))
      )
    )
    )
  ).pipe(
    scan((user, value) => {
      return this.modifyPost(user, value)
    }, [] as GetData[]),
    shareReplay(1),
    // share()
  );

  modifyPost(user: GetData[], value: any) {
    if (!(value instanceof Array)) {
      if (value.action === "add") {
        return [...user, value.data]
      }
      if (value.action === "update") {
        return user.map(users =>
          users.id === value.data.id ? value.data : users);
      }
      if (value.action === "delete") {
        return user.filter((data) => data.id != value.data.id);
      }
    } else {
      return value;
    }
    return user
  }

  savePost(data: CrudAction<GetData>) {
    if (data.action === "add") {
      return this.postUser(data.data);
    }
    if (data.action === "update") {
      return this.updateUsertoServer(data.data);
    }
    if (data.action === "delete") {
      return this.deleteUsertoServer(data.data);
    }
    return of(data.data);
  }

  postUser(data: GetData) {
    return this.http.post("https://localhost:44362/User/register", data).pipe(map((post) => {
      return {
        ...data,
        ...post
      };
    }))
  }
  updateUsertoServer(data: GetData) {
    return this.http.patch<any>(`https://localhost:44362/User/update/${data.id}`, data).pipe(map(res => {
      return {
        ...data,
        ...res
      }
    }));
  }
  deleteUsertoServer(data: GetData) {
    return this.http.delete(`https://localhost:44362/User/delete/${data.id}`).pipe(map(res => {
    }))
  }
  particularpost$ = combineLatest([
    this.allusersList$,
    this.getIdSubject$
  ]).pipe(tap(data => {
    this.loader.hideLoader()
  }), map(([userlist, id]) => {
    return userlist.find((user) => user.id === id);
  }),
    // catchError(this.handleError),
    shareReplay(1),
    // share()
  );


  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage: string = 'Something bad happened; please try again later.'
  //   if (error.error instanceof ErrorEvent) {
  //     //client error 
  //     errorMessage = `An error occurred: ${error.error.message}`;
  //     console.error(errorMessage);

  //   } else {
  //     //server side error
  //     errorMessage = `Backend returned:${error.message}`;
  //     console.error(errorMessage);
  //   }
  //   return throwError(errorMessage)
  // }
}
