import React from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

const data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
      label: "",
      backgroundColor: 'rgb(52,152,219)',
      borderColor: 'rgb(52,152,300)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(52,152,300)',
      hoverBorderColor: 'rgb(52,152,200)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
}

class BarChart extends React.Component {
  state = {
    data: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:5000/')
      const data = await res.data
      this.setState({ data })
    } catch (e) {
      console.error('Something went wrong', e)
    }
  }


  render() {
    return (
      <div style={{ background: 'white' }}>
        <Bar data={data} width="500" height="250"/>
      </div>
    )
  }
}

export default BarChart
