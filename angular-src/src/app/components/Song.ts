export class Song{
  title: string;
  artist: string;
  bpm: number;
  key: string;

  static calculateMusicalKey(spotifyKey: number, spotifyMode: number) {
    let tempKey = '';
    switch (spotifyKey) {
      case -1:
        tempKey = 'Spotify key not populated';
        break;
      case 0:
        tempKey = 'C';
        break;
      case 1:
        tempKey = 'C#';
        break;
      case 2:
        tempKey = 'D';
        break;
      case 3:
        tempKey = 'D#';
        break;
      case 4:
        tempKey = 'E';
        break;
      case 5:
        tempKey = 'F';
        break;
      case 6:
        tempKey = 'F#';
        break;
      case 7:
        tempKey = 'G';
        break;
      case 8:
        tempKey = 'G#';
        break;
      case 9:
        tempKey = 'A';
        break;
      case 10:
        tempKey = 'A#';
        break;
      case 11:
        tempKey = 'B';
        break;
    };

    if (spotifyMode == 0) {
      tempKey = tempKey + 'min';
    } else if (spotifyMode == 1) {
      tempKey = tempKey + 'maj';
    } else {
      tempKey = tempKey + 'mode not populated in Spotify';
    }

     return tempKey;
  }
}
