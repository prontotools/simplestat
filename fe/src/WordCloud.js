import React from 'react'
import ReactWordCloud from 'react-wordcloud'

const words = [
  {word: 'hello', value: 3},
  {word: 'world', value: 2},
  {word: 'github', value: 2},
  {word: 'code', value: 1},
]

class WordCloud extends React.Component {
  render() {
    return (
      <div style={{width: 600, height: 400}}>
        <ReactWordCloud
          words={words}
          wordCountKey='value'
          wordKey='word'
        />
      </div>
    )
  }
}

export default WordCloud
