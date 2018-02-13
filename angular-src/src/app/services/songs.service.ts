import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class SongsService {

  constructor(private http:Http) { }

  getSongs() {
    let headers = new Headers();
    return this.http.get('http://localhost:8080/api/songs', {headers: headers})
    .map(res => res.json());
  }

  createSong(song) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/songs', song, {headers: headers})
    .map(res => res.json());
  }

  deleteSong(song_id) {
    return this.http.delete('http://localhost:8080/api/songs/' + song_id)
    .map(res => res.json());
  }

}
