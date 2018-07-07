import React from 'react'
import axios from 'axios'
import ReactWordCloud from 'react-wordcloud'

class WordCloud extends React.Component {
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
