import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'

import Sentiment from './Sentiment';
import WordCloud from './WordCloud';
import Activities from './Activities';

export const Navbar = () => (
    <div class="navslide">
        <div class="ui menu icon borderless grid" data-color="inverted white">
            <a class="item labeled openbtn">
                <i class="ion-navicon-round big icon"></i>
            </a>
            <div class="ui item" >
                <img class="ui small image" src="simstatlogo.png" alt="logo" />
            </div>
            <div class="right menu colhidden">
                <div class="ui item">
                    <h4>Lovely Gatuk</h4>
                </div>
                <div class="ui item" tabindex="0">
                    <img class="ui mini circular image" src="https://avatars0.githubusercontent.com/u/7122189?s=460&v=4" alt="label-image" />
                </div>
                <a class="item labeled rightsidebar computer only">
                    <i class="ion-wrench large icon"></i>
                </a>
            </div>
        </div>
    </div>
)

export const GridSection = () => (
    <div class="ui internally grid" style={{paddingTop: '30px'}}>
    <div class="row">
    </div>
</div>
)

class Show extends Component{

    state = {
        searchKeyword: '',
        searchResult: [],
        posts: [{
            "comments": [
                {
                    "created_time": "2018-07-07T06:59:18+0000",
                    "like_count": 0,
                    "message": "555555"
                },
                {
                    "created_time": "2018-07-07T07:24:34+0000",
                    "like_count": 0,
                    "message": ""
                },
                {
                    "created_time": "2018-07-07T07:25:40+0000",
                    "like_count": 0,
                    "message": "https://gist.github.com/rxaviers/7360908"
                }
            ],
            "created_time": "2018-07-07T06:59:05+0000",
            "sentiment": {
                "neg": 1,
                "pos": 0
            },
            "title": "ไฟลุกกก",
            "update_time": "2018-07-07T07:25:43+0000",
            "url": "https://www.facebook.com/groups/635133846845099/permalink/637369686621515/"
        }]
    }

    handleOnSearchChange = e => {
      return this.setState({
        searchKeyword: e.target.value
      })
    }

  submitSearch = e => {
        if (e.key === 'Enter') {
          axios.get(`http://localhost:5000/search/${this.state.searchKeyword}`).then(
            res => {
                this.setState({
                    searchResult: res.data
                })
            }
          ).catch(
            e => {
                this.setState({
                    searchResult: []
                })
            }
          )
        }
    }

    componentWillMount = () => {
        document.body.style.backgroundColor = "#eaf2f7";
        document.body.style.padding = '0px';
        document.body.style.margin = '0px';
    } 

    render(){
        console.log(this.state.posts)
        return(
            <React.Fragment>
                <Navbar />
                <div class="ui internally grid" style={{paddingTop: '30px'}}>
                    <div class="row">

                        <div class="two wide column">
                            <img />
                        </div>

                        <div class="twelve wide column">
                            <div class="ui stackable two column grid">
                                <div class="column">

                                  {/* SEARCH */}
                                  <div class="ui segments">
                                    <div class="ui segment">
                                      <div class="ui search">
                                        <div class="ui large icon input">
                                          <input
                                            class="prompt"
                                            type="text"
                                            placeholder="What's on your mind ?"
                                            value={this.state.searchKeyword}
                                            onChange={this.handleOnSearchChange}
                                            onKeyPress={this.submitSearch}
                                          />
                                          <i class="search icon" />
                                        </div>
                                      </div>
                                    </div>

                                    <div class="ui segment">
                                      <div class="ui items">
                                        { this.state.searchResult.map(result => (
                                          <div class="item">
                                            <div class="ui tiny rounded image">
                                            </div>
                                            <div class="content">
                                              <a class="header" href={result._source.url}>{result._source.title}</a>
                                              <div class="meta">
                                                <span class="cinema">{moment(result._source.created_time).fromNow()}</span>
                                                <br />
                                                <br />
                                                <span class="cinema"><strong>Score:</strong> {Math.round(result._score * 100) / 100}</span>
                                              </div>
                                            </div>
                                          </div>
                                        )) }
                                      </div>
                                    </div>
                                  </div>

                                    {/* DRAMA */}
                                    <Sentiment />

                                    {/* Activity Stat */}
                                    <div class="ui segments">
                                        <div class="ui segment">
                                            <h3 class="ui header"> 📊 Activity Stat</h3>
                                        </div>
                                        <div class="ui segment">
                                            <Activities/>
                                            {/* <canvas id="chart-area" style={{width: '218px', height: '109px' ,height: "218", width: "436"}}></canvas> */}
                                        </div>
                                    </div>

                                    <div class="ui segments">
                                        <div class="ui segment">
                                            <WordCloud/>
                                        {/* <img src="https://media.istockphoto.com/photos/word-cloud-about-leadership-picture-id472300670" width="90%" alt="word-cloud" /> */}
                                        </div>
                                    </div>
                                </div>


                                <div class="column">
                                    <div class="six wide column">

                                        <div class="ui segments">
                                            <div class="ui segment">
                                                <h3 class="ui header">🔥 Hot Topic</h3>
                                            </div>

                                            <div class="ui segment">
                                                <div class="ui items">
                                                    { this.state.posts.slice(0, 3).map(post => 
                                                        <div class="item">
                                                            <div class="ui tiny rounded image">
                                                            </div>
                                                            <div class="content">
                                                                <a class="header" href="#">{post.title}</a>
                                                                <div class="meta">
                                                                <span class="cinema"><a href={post.url}>this link</a>
                                                                </span>
                                                                </div>
                                                                <div class="description">
                                                                    <p></p>
                                                                </div>
                                                                <div class="extra">
                                                                    <button class="ui greenli inverted tiny button follow">Follow</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>

                                        <div class="ui segments">
                                            <div class="ui segment">
                                                <h3 class="ui header">📆 Related Event</h3>
                                            </div>
                                            <div class="segment">
                                                <div class="ui items">
                                                    <div class="item">
                                                        <div class="content">

                                                                <div class="ui segment">
                                                                        <div class="ui middle aligned relaxed list">
                                                                            <div class="item">
                                                                                <div class="right floated content">
                                                                                    <a class="ui red basic button">Just Now</a>
                                                                                </div>
                                                                                <i class="icon large circular red">S.</i>
                                                                                <div class="content">
                                                                                    You have 4 pending tasks.
                                                                                </div>
                                                                            </div>
                                                                            <div class="item">
                                                                                <div class="right floated content">
                                                                                    <a class="ui teal basic button">2 Hours ago</a>
                                                                                </div>
                                                                                <i class="icon large circular teal">Th.</i>
                                                                                <div class="content">
                                                                                    New SimpleStat
                                                                                </div>
                                                                            </div>
                                                                            <div class="item">
                                                                                <div class="right floated content">
                                                                                    <a class="ui blue basic button">31 May</a>
                                                                                </div>
                                                                                <i class="icon large circular blue">W.</i>
                                                                                <div class="content">
                                                                                    Best App ever
                                                                                </div>
                                                                            </div>
                                                                            <div class="item">
                                                                                <div class="right floated content">
                                                                                    <a class="ui purple basic button">30 May</a>
                                                                                </div>
                                                                                <i class="icon large circular purple">M</i>
                                                                                <div class="content">
                                                                                    New user registered.
                                                                                </div>
                                                                            </div>
                                                                            <div class="item">
                                                                                <div class="right floated content">
                                                                                    <a class="ui brown basic button">27 May</a>
                                                                                </div>
                                                                                <i class="icon large circular brown">T</i>
                                                                                <div class="content">
                                                                                    New Version just arrived.
                                                                                </div>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="ui segments">
                                            <div class="ui segment">
                                                <h3 class="ui header">👑 Top User</h3>
                                            </div>
                                            <div class="ui segment">
                                                <div class="ui very relaxed list">
                                                    <div class="item">
                                                        <img class="ui tiny circular image" src="https://avatars0.githubusercontent.com/u/704794?s=460&v=4"/>
                                                        <div class="content">
                                                            <div class="header">
                                                                Kristine Golgi
                                                                <div class="ui heart rating" data-rating="2"><i class="icon active"></i><i class="icon active"></i><i class="icon"></i><i class="icon"></i></div>
                                                            </div>
                                                            User Rating
                                                        </div>
                                                    </div>
                                                    <div class="item">
                                                        <img class="ui tiny circular image" src="https://avatars3.githubusercontent.com/u/19608954?s=460&v=4"/>
                                                        <div class="content">
                                                            <div class="header">
                                                                Danny Golgi
                                                                <div class="ui heart rating" data-rating="2"><i class="icon active"></i><i class="icon active"></i><i class="icon"></i><i class="icon"></i></div>
                                                            </div>
                                                            User Rating
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>



                        <div class="two wide column">
                            <img />
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Show
