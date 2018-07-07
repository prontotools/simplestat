import React from 'react'
import axios from 'axios'
import { path } from 'ramda'

class Sentiment extends React.Component {
  state = {
    data: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:5000')
      const data = await res.data
      this.setState({ data })
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }

  isPositive = d => +path(['sentiment', 'pos'], d) >= +path(['sentiment', 'neg'], d)

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3 className="ui header">😂 Sentiment</h3>
        </div>
        <div className="ui segment">
          <div className="ui items">

            {this.state.data.slice(5, 15).map(d => (
              <div className="item">
                <div className="ui tiny rounded image" style={{
                  color: this.isPositive(d) ? '#2ecc71' : '#e74c3c'
                }}>
                  { this.isPositive(d) ? 'POSITIVE' : 'NEGATIVE' }
                </div>
                <div className="content">
                  <a className="header" href={d.url} style={{
                    color: this.isPositive(d) ? '#2ecc71' : '#e74c3c'
                  }}>{d.title}</a>
                  <div className="meta">
                    <span className="cinema"></span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    )
  }
}

export default Sentiment
