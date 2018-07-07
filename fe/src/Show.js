import React, { Component } from 'react';
import axios from 'axios'

import Sentiment from './Sentiment';
import WordCloud from './WordCloud';
import Activities from './Activities';
import Search from './Search'

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
        posts: []
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

    componentDidMount = () => {
      axios.get('http://localhost:5000/hot-topic/').then(
        res => {
          this.setState({
            posts: res.data
          })
        }
      ).catch(
        () => {
          this.setState({
            posts: []
          })
        }
      )
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
                      <Search />
                    </div>

                    <Sentiment />

                    <div class="ui segments">
                      <div class="ui segment">
                        <h3 class="ui header">📊 Activity Stats in Last 7 Days</h3>
                      </div>
                      <div class="ui segment">
                        <Activities/>
                      </div>
                    </div>

                    <div class="ui segments">
                      <div class="ui segment">
                        <WordCloud/>
                      </div>
                    </div>
                  </div>

                  <div class="column">
                    <div class="six wide column">
                      <div class="ui segments">
                        <div class="ui segment">
                          <h3 class="ui header">🔥 Hot Topics</h3>
                        </div>

                                            <div class="ui segment">
                                                <div class="ui items">
                                                    { this.state.posts.map(post =>
                                                        <div class="item">
                                                            <div class="ui tiny rounded image">
                                                              <a className='header' href={post.url}>{post.fire}</a>
                                                            </div>
                                                            <div class="content">
                                                                <a class="header" href={post.url}>{post.title}</a>
                                                            </div>
                                                        </div>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>

                  <div class="ui segments">
                    <div class="ui segment">
                      <h3 class="ui header">📆 Related Events</h3>
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
                    <h3 class="ui header">👑 Top Users</h3>
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
