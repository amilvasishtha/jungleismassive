import { Component, OnInit } from '@angular/core';
import {SongsService} from '../../services/songs.service';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.css']
})
export class MixComponent implements OnInit {

  songs: Object;
  compatibleSongs: Object;

  constructor(private songsService: SongsService) { }

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

  updateCompatibleSongs(songid) {
    // this.compatibleSongs = songs
  }

}
