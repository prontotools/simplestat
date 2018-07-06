import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

const ParagraphStyle = styled.p`{
  fontFamily: 'Montserrat','sans-serif';
  fontSize: 35px;
}
`

class App extends Component {
  componentDidMount() {
    axios.get('http://98faf6b9.ngrok.io/g/')
      .then(res => console.log(res))
  }

  render() {
    return (
      <div classNameName="App">
        <div className="ui inverted vertical masthead center aligned segment">
          <div classNameName="ui text container">
            <h1 className="ui inverted">
                <div className="ui tiny image">
                  <img src="fb.png" alt='fb' />
                </div>
                  CORY's Friends
            </h1>
            <ParagraphStyle>Simple Stat for Community Managers.</ParagraphStyle>
            <div className="ui huge facebook button"><i className="facebook icon"></i>Log in with Facebook</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
