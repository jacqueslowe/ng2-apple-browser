import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Constants } from '../constants';
import { Search } from '../search/search.model';
import { Track } from '../Music/track.model';
import { Movie } from '../movies/movie.model';
import { Book } from '../book/book.model';

@Injectable()
export class ItunesService {
    /*
    media: song, movie, podcast, song, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
    */
    searchTerm = '?term=';
    searchMediaType = '&entity=';
    searchLimit = '&limit=25';

    constructor(private httpClient: HttpClient, private constants: Constants) { }

    getItems(search: Search): Observable<any> {

        const requestURL: string = this.constants.itunesUrl +
            this.searchTerm + search.searchChoice +
            this.searchLimit;

        console.log('ItunesService.getItems(): ' + requestURL);
        return this.httpClient.get<any>(requestURL)
        .map(data => {return data.results});
    }

    getBooks(search: Search): Observable<any> {

        const requestURL: string = this.constants.itunesUrl +
            this.searchTerm + search.searchChoice +
            this.searchLimit + '&media=ebook';

        console.log('ItunesService.getBooks(): ' + requestURL);
        return this.httpClient.get<any>(requestURL)
            .map(data => {return data.results});
    }

    getMovies(search: Search): Observable<any> {

        const requestURL: string = this.constants.itunesUrl +
            this.searchTerm + search.searchChoice +
            this.searchLimit +
            this.searchMediaType + 'movie';

        console.log('ItunesService.getMovies(): ' + requestURL);

        return this.httpClient.get<any>(requestURL)
            .map(data => {return data.results});
    }

    getMusic(search: Search): Observable<any> {

        const requestURL: string = this.constants.itunesUrl +
            this.searchTerm + search.searchChoice +
            this.searchLimit +
            this.searchMediaType + 'song';

            return this.httpClient.get<any>(requestURL)
             .map(data => {return data.results});
            
/* return this.http.get(requestURL) 
      .map(res => { 
        return res.json().results.map(item => { 
          return new SearchItem( 
              item.trackName,
              item.artistName,
              item.trackViewUrl,
              item.artworkUrl30,
              item.artistId
          );
        });
      });*/

            //
    
    }
}
