import React from 'react'
import { path } from 'ramda'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

const mockedData = {
  comments: {
    data: [3, 0, 2, 10, 3, 20, 8],
    label: ['1 July', '2 July', '3 July', '4 July', '5 July', '6 July', '7 July']
  },
  posts: {
    data: [3, 0, 2, 10, 3, 20, 8],
    label: ['1 July', '2 July', '3 July', '4 July', '5 July', '6 July', '7 July']
  }
}

class Activities extends React.Component {
  state = {
    postData: [],
    commentData: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:5000/activities')
      const data = await res.data
      const postData = {
        labels: path(['posts', 'label'], data),
        datasets: [{
          label: '# โพสต์',
          backgroundColor: 'rgb(52,152,219)',
          borderColor: 'rgb(52,152,300)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(52,152,300)',
          hoverBorderColor: 'rgb(52,152,200)',
          data: path(['posts', 'data'], data)
        }]
      }

      const commentData = {
        labels: path(['comments', 'label'], data),
        datasets: [{
          label: '# คอมเมนต์',
          backgroundColor: 'rgb(52,152,219)',
          borderColor: 'rgb(52,152,300)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgb(52,152,300)',
          hoverBorderColor: 'rgb(52,152,200)',
          data: path(['comments', 'data'], data)
        }]
      }

      this.setState({ postData, commentData })
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ background: 'white', width: '500px' }}>
          <Bar data={this.state.postData} width="500" height="250"/>
          <br />
          <Bar data={this.state.commentData} width="500" height="250"/>
        </div>
      </React.Fragment>
    )
  }
}

export default Activities
