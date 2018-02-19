import { Component, OnInit } from '@angular/core';
import {SongsService} from '../../services/songs.service';
import {SpotifyService} from '../../services/spotify.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-managesongs',
  templateUrl: './managesongs.component.html',
  styleUrls: ['./managesongs.component.css']
})
export class ManagesongsComponent implements OnInit {
  title: String;
  artist: String;
  bpm: number;
  key: number;
  songs: Object;
  searchStr: string;
  searchRes: Track[];
  songAudioDetails: AudioDetails;
  songKey: number;
  songTempo: number;

  constructor(private songsService: SongsService,
    private spotifyService: SpotifyService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSongsInLibrary();
  }

  getSongsInLibrary() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
      console.log("songs loaded!");
    },
    err => {
      console.log(err);
      return false;
    });
  }

  searchSpotify() {
    this.spotifyService.searchSpotify(this.searchStr).subscribe(res => {
      this.searchRes = res.data.tracks.items;
    });
  }


  fillTrackDetails(trackObj) {
    this.spotifyService.getAudioAnalysis(trackObj.id).subscribe(res => {
      if(res.success) {
        console.log(res.data);
        this.key = res.data.track.key;
        this.bpm = res.data.track.tempo;
        console.log(res.data.track.key);
        console.log(res.data.track.tempo);
      } else {
        console.log("Spotify audio details failed");
        this.flashMessage.show("Spotify audio details failed", {cssClass: 'alert-danger', timeout: 10000});
      }
    });

    let trackArtistsStr = '';
    let trackArtists =  trackObj.artists;
    trackArtists.forEach(function (artist) {
      trackArtistsStr = trackArtistsStr + artist.name + ', ';
    });

    this.title = trackObj.name;
    this.artist = trackArtistsStr;
    this.key = this.songKey;
    this.bpm = this.songTempo;
    this.searchRes = null;
  }

  onCreateSongSubmit() {
    const song = {
      title: this.title,
      artist: this.artist,
      bpm: this.bpm,
      key: this.key
    }

    this.songsService.createSong(song).subscribe(data => {
      if(data.success) {
        this.songs = data.songs;
        this.title = '';
        this.artist = '';
        this.bpm = null;
        this.key = null;
        this.flashMessage.show("Song added to your library", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['managesongs']);
      } else {
        this.flashMessage.show("Song not added to library", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['managesongs']);
      }
    });

  }

  onClickDeleteSong(song_id) {
    this.songsService.deleteSong(song_id).subscribe(data => {
      if(data.success) {
        this.songs = data.songs;
        this.flashMessage.show("Song removed from your library", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['managesongs']);
      } else {
        this.flashMessage.show("Song not removed from your library", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['managesongs']);
      }
    });
  }

}

export class Artist{
  id: number;
  name: string;
  genres: any;
  albums: Album[];
}

export class Track{
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
}

export class Album{
  id: number;
}

export class AudioDetails {
  key: number;
  tempo: number;
}
