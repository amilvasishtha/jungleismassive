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
  compatibleSongs: Song[];

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    this.getSongsInLibrary();
  }

  getSongsInLibrary() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.compatibleSongs = this.songs;
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

  updateCompatibleSongs(key, mode) {
    this.compatibleSongs = this.songs.filter(song =>
      (song.key == key || song.key == (key+5 % 12) || song.key == (key+7 % 12)) && song.mode == mode
    );
  }

}
