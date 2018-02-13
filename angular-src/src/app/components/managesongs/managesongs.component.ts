import { Component, OnInit } from '@angular/core';
import {SongsService} from '../../services/songs.service';
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
  bpm: Number;
  key: String;
  songs: Object;

  constructor(private songsService: SongsService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
      console.log("songs loaded!");
    },
    err => {
      console.log(err);
      return false;
    });
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
        this.key = '';
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
