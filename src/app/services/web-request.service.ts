import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:5000'
  }


public get(uri: string) {
  return this.http.get(`${this.ROOT_URL}/${uri}`);
}

public post(uri: string, body: object) {
  return this.http.post(`${this.ROOT_URL}/${uri}`, body);
}

public put(uri: string, body: object) {
  return this.http.put(`${this.ROOT_URL}/${uri}`, body);
}

public delete(uri: string) {
  return this.http.delete(`${this.ROOT_URL}/${uri}`);
}

// LOGIN
public login(body) {
  return this.http.post(`${this.ROOT_URL}/auth/login`, body)
}


public getFile(uri: string) {
  return this.http.get(`${this.ROOT_URL}/${uri}`, {responseType: "blob"});
}
}