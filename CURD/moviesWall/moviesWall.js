import { LightningElement, track, api } from 'lwc';
import getDataOfMovies from '@salesforce/apex/movies.getDataOfMovies'
import postMovies from '@salesforce/apex/movies.postMovies'

export default class MoviesWall extends LightningElement {
  @track data = [];
  @track duplicate;
  @track newOne = [];
  @track queryTerm;
  @track isOpenModal = false;
  @track movieName = "";

  @api endpointURL;
  handleOpenModal() {
    this.isOpenModal = true;
  }

  handleCloseModal() {
    this.isOpenModal = false;
  }
  handleSave() {
    postMovies({ movieName: this.movieName })
      .then(res => {
        console.log(res)
        this.handleCloseModal();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleMovieName(event) {
    this.movieName = event.target.value;
  }

  handleGet() {
    getDataOfMovies({ strEndPointURL: this.endpointURL })
      .then(duplicate => {
        for (let i = 0; i < 20; i++) {
          let obj = {
            "director_name": "",
            "movie_title": "",
            "actor_2_name": "",
            "actor_1_name": ""
          }
          obj.director_name = duplicate[i]["director_name"];
          obj.movie_title = duplicate[i]["movie_title"];
          obj.actor_2_name = duplicate[i]["actor_2_name"];
          obj.actor_1_name = duplicate[i]["actor_1_name"];
          this.data.push(obj);
        }
        this.newOne = this.data;
        console.log(this.newOne[0].movie_title)
      }).catch(err => {
        console.log("err");
      })
  }


  handleKeyUp(evt) {
    const isEnterKey = evt.keyCode === 13;
    if (isEnterKey) {
      if (evt.target.value.length >= 2) {
        console.log("Now I am in If")
        for (let i = 0; i <= 20; i++) {
          var dummyName = this.newOne[i].movie_title;
          console.log(dummyName)
          if (evt.target.value == dummyName) {
            this.queryTerm = evt.target.value;
            this.data = [];
            let obj = {
              "director_name": "",
              "movie_title": "",
              "actor_2_name": "",
              "actor_1_name": ""
            }
            obj.director_name = this.newOne[i]["director_name"];
            obj.movie_title = this.newOne[i]["movie_title"];
            obj.actor_2_name = this.newOne[i]["actor_2_name"];
            obj.actor_1_name = this.newOne[i]["actor_1_name"];
            this.data.push(obj);
            break;
          }
        }
      } else {
        console.log("Now I am in else")
        this.data = this.newOne;
      }
    }

  }


}