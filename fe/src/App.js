import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import {
  Redirect
} from 'react-router-dom'

const ParagraphStyle = styled.p`
  font-family: Montserrat,sans-serif;
  font-size: 35px;
`

class App extends Component {
  componentDidMount() {
    axios.get('http://localhost:5000/')
      .then(res => console.log(res))
  }

  state = {
    isLogin: false,
    accessToken: '',
    email: '',
    expiresIn: '',
    id: '',
    name: '',
    picture: null,
    userID: '',
  }

  responseFacebook = (user) => {
    this.setState({
    isLogin: true,
    accessToken: user.accessToken,
    email: user.email,
    expiresIn: user.expiresIn,
    id: user.id,
    name: user.name,
    picture: user.picture.data.url,
    userID: user.userID,
  })
}

  logOut = () => {
    localStorage.clear()
    this.setState({
      isLogin: false,
    })
  }

  render() {
    return (
      <div class="musthead_center_full">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <center>
              { this.state.isLogin ?
                  <Redirect to='/show'/>
                :
                <React.Fragment>
                  <h1 className="ui inverted">
                    <div className="ui tiny image">
                      <img src="fb.png" alt='fb' />
                    </div>
                    CORY's Friends
                  </h1>
                  <ParagraphStyle>SimpleStat for Community Managers.</ParagraphStyle>
                  <FacebookLogin
                    appId="264925624091528"
                    autoLoad={true}
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                    cssClass="ui huge facebook button"
                    icon='facebook icon'
                  />
                </React.Fragment>
              }
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default App
