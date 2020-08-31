import { LightningElement, track } from 'lwc';
import getDataOfMovies from '@salesforce/apex/movies.getDataOfMovies'
export default class MoviesWall extends LightningElement {
@track data =[];
@track duplicate;
@track queryTerm;

async connectedCallback(){
    let endpointURL = 'http://starlord.hackerearth.com/movies';
    this.duplicate = await getDataOfMovies({strEndPointURL : endpointURL})

    for(let i=0; i<20; i++){
        let obj = {
            "director_name" : "",
            "movie_title" : "",
            "actor_2_name" : "",
            "actor_1_name" : ""
        }
        obj.director_name = await this.duplicate[i]["director_name"];
        obj.movie_title = await this.duplicate[i]["movie_title"];
        obj.actor_2_name = await this.duplicate[i]["actor_2_name"];
        obj.actor_1_name = await this.duplicate[i]["actor_1_name"];

        this.data.push(obj);
    }
}

async handleKeyUp(evt) {
    const isEnterKey = evt.keyCode === 13;
    if (isEnterKey) {
        for(let i=0; i<=20; i++){
             var movie_title = await this.duplicate[i]["movie_title"];
             console.log(movie_title)
            if(evt.target.value==movie_title){
                this.queryTerm = evt.target.value;
                break;
            }else{
                this.queryTerm = ""
            }
        }
    }
}
}
