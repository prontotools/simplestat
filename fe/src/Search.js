import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Search extends React.Component {
  state = {
    searchKeyword: '',
    searchResult: []
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

  render () {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default Search
