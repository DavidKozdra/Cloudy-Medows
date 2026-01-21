
class Sound {
    constructor(srcarray, volume) {
        this.src = srcarray;
        this.var = 0;
        this.volume = volume;
    }
    play() {
        this.sound = document.createElement("audio")
        this.sound.setAttribute("class","soundfx");
        this.var = round(random(0,this.src.length-1))
        this.sound.src = this.src[this.var];
        this.sound.setAttribute("preload", "none");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.sound.volume = fxSlider.value() * this.volume;
        // Handle play errors gracefully (e.g., autoplay restrictions on mobile)
        this.sound.play().catch(e => {
            // Silently ignore autoplay errors
        });
    }

    stop() {
        if (this.sound) {
            this.sound.pause();
        }
    }


}


class MusicPlayer {
    constructor(tracks) {
        this.player = document.createElement("audio");
        this.tracks = tracks;
        
        this.currentTrack = round(random(0,this.tracks.length-1));
        this.player.src = tracks[this.currentTrack];
        //this.player.setAttribute("preload", "auto");
        this.player.setAttribute("controls", "none");
        this.player.setAttribute("preload", "none");
        this.player.style.display = "none";
        this.volume = this.player.volume;
        
        document.body.appendChild(this.player);
        

        
    }

    play() {
        // Handle play errors gracefully (e.g., autoplay restrictions on mobile)
        this.player.play().catch(e => {
            // Silently ignore autoplay errors - will retry on next update
        });
    }
    stop() {
        this.player.pause();
    }


    update(){ 
        this.play();
        if (typeof musicSlider !== 'undefined' && musicSlider) {
            this.player.volume = musicSlider.value() * 0.05;
        }
        //console.log(this.player.src);
        //console.log(this.player.currentTime + " Not " + (this.player.duration - 0.1) + " Track " + this.currentTrack);
        if( this.player.currentTime >= this.player.duration - 0.1){ //check if done

            this.player.src = this.tracks[round(random(0,this.tracks.length-1))];
            this.play()
        }

        var fxlist = document.getElementsByClassName("soundfx");
        for(var i =0; i<fxlist.length; i++){
            if(fxlist[i].currentTime >= fxlist[i].duration - 0.1){ //check if done
                //console.log(fxlist[i].currentTime + " DONE " + fxlist[i].duration)
                fxlist[i].remove();
            }
        }
    }

}