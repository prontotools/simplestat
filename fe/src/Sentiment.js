import React from 'react'
import axios from 'axios'

class Sentiment extends React.Component {
  state = {
    words: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:5000/wordcloud')
      const words = await res.data
      this.setState({ words })
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }

  render() {
    return (
      <div class="ui segments">
        <div class="ui segment">
          <h3 class="ui header">😂 Sentiment</h3>
        </div>
        <div class="ui segment">
          <div class="ui items">
            <div class="item">
              <div class="ui tiny rounded image">
              </div>
              <div class="content">
                <a class="header" href="#">New App here!</a>
                <div class="meta">
                  <span class="cinema">Irure ex aute dolor minim sit. Enim eiusmod cillum incididunt fugiat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sentiment
