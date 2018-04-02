import { Component, OnInit } from '@angular/core';
import {SongsService} from '../../services/songs.service';
import {Song} from '../Song';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.css']
})
export class MixComponent implements OnInit {

  songs: Song[];
  compatibleSongs: Object;

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    this.getSongsInLibrary();
  }

  getSongsInLibrary() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
      console.log("songs loaded in mix!");
    },
    err => {
      console.log(err);
      return false;
    });
  }

  calculateMusicalKey(spotifyKey: number, spotifyMode: number) {
    return Song.calculateMusicalKey(spotifyKey, spotifyMode);
  }

  updateCompatibleSongs(songid) {
    // this.compatibleSongs = songs
  }

  getCompatibleKeys() {

  }

}
