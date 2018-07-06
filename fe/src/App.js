import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';

const ParagraphStyle = styled.p`
  font-family: Montserrat,sans-serif;
  font-size: 35px;
`

class App extends Component {
  componentDidMount() {
    axios.get('http://98faf6b9.ngrok.io/g/')
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

  responseFacebook = (user) => this.setState({
    isLogin: true,
    accessToken: user.accessToken,
    email: user.email,
    expiresIn: user.expiresIn,
    id: user.id,
    name: user.name,
    picture: user.picture.data.url,
    userID: user.userID,
  })

  logOut = () => {
    localStorage.clear()
    this.setState({
      isLogin: false,
    })
  }

  render() {
    return (
      <div classNameName="App">
        <div className="ui inverted vertical masthead center aligned segment">
          <div classNameName="ui text container">
            <center>
              { this.state.isLogin ?
                <React.Fragment>
                  <img src={this.state.picture} alt='profilelogo' />
                  <ParagraphStyle>{this.state.name}</ParagraphStyle>
                  <button onClick={this.logOut} class="ui huge facebook button">
                    <i class="facebook icon" />Bye Bye
                  </button>
                </React.Fragment>
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
