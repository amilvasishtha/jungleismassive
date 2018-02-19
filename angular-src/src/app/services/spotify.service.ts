import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    private clientId = 'fb4175b757da4773a6f1cc32ce06d553';
    private clientSecret = '7363c6d4f9324dbcaf27c5190ef5cc7b';
    private callbackUrl = 'http%3A%2F%2Flocalhost%3A4200%2Fmanagesongs';
    private access_token:string;
    private encoded = btoa(this.clientId + ':' + this.clientSecret);

    private searchUrl: string;

  constructor(private http:Http) { }

  searchSpotify(searchStr:string) {
    return this.http.get('http://localhost:8080/api/spotify/search?name=' + searchStr)
    .map(res => res.json());
  }

  getAudioAnalysis(spotifyTrackId: number) {
    return this.http.get('http://localhost:8080/api/spotify/audio-analysis/' + spotifyTrackId)
    .map(res => res.json());
  }

}
