import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const STATE_PLAYING = 'playing';
const STATE_STOPPED = 'stopped';
const STATE_PAUSED = 'paused';
const STATE_ENDED = 'ended';

@Injectable()
export class PlayerService {

    private playerStateSubject: Subject<string>;
    private stream$: Observable<string>;
    private self: any;

    player = null;
    selectedTrack = null;
    selectedTrackDuration = 0;
    playerState = null;

    constructor() {
        const self = this;
        this.player = new Audio();
        this.playerState = STATE_STOPPED;

        this.playerStateSubject = new Subject();
        this.stream$ = this.playerStateSubject.map(x => x);

        this.player.addEventListener('pause', function () {
            self.playerState = STATE_PAUSED;
            self.playerStateChanged(self.playerState);
        });

        this.player.addEventListener('playing', function () {
            self.playerState = STATE_PLAYING;
            self.playerStateChanged(self.playerState);
        });

        this.player.addEventListener('ended', function () {
            self.playerState = STATE_ENDED;
            self.playerStateChanged(self.playerState);
        });
    }

    getStream() {
        return this.stream$;
    }
    private playerStateChanged(newState: string) {
        this.playerStateSubject.next(newState);
    }

    play(item: any) {
        console.log('PlayerService.play().item.previewUrl' + JSON.stringify(item.previewUrl));
        if (this.selectedTrack === null || this.selectedTrack.trackId !== item.trackId) {
            this.selectedTrack = item;
            this.playerState = STATE_STOPPED;
        }

        if (this.playerState === STATE_STOPPED || this.playerState === STATE_PAUSED) {
            console.log('PlayerService.play().stopped()');

            this.playerState = STATE_PLAYING;
            this.player.src = item.previewUrl;
            this.player.play();
        } else if (this.playerState === STATE_PLAYING) {
            console.log('PlayerService.play().pause()');
            this.player.pause();
            this.playerState = STATE_PAUSED;
        }
    }
}
