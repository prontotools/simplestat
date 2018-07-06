import React from 'react'
import axios from 'axios'
import ReactWordCloud from 'react-wordcloud'

class WordCloud extends React.Component {
  state = {
    words: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:5000/')
      const data = await res.data
      console.log('[WordCloud] data', data)
      // Need to change here to not hardcoded
      const words = [
        {word: 'สวัสดี', value: 3},
        {word: 'โลก', value: 2},
        {word: 'github', value: 2},
        {word: 'code', value: 1},
      ]

      this.setState({ words })
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }

  render() {
    return (
      <div style={{width: 600, height: 400, border: '1px solid white'}}>
        <ReactWordCloud
          words={this.state.words}
          wordCountKey='value'
          wordKey='word'
        />
      </div>
    )
  }
}

export default WordCloud
