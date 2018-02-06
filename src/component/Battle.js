import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import PlayerAvatar from './PlayerPreview'


class PlayerInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    let value = event.target.value
    this.setState(() => {
      return {
        'username': value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    return this.props.onSubmit(this.props.id, this.state.username)
  }

  render () {
    return (
      <form className="column" onSubmit={this.handleSubmit}> 
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input 
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button 
          className="button"
          type="submit"
          disabled={!this.state.username}
        >Submit</button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


export default class Battle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetPlayer = this.resetPlayer.bind(this)
    this.getStateAttribute = this.getStateAttribute.bind(this)
    
  }

  handleSubmit (id, username) {
    this.setState(() => {
      var newState = {}
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  resetPlayer (id) {
    this.setState(() => {
      var newState = {}
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null
      return newState;
    })
  }

  getStateAttribute (id, name) {
    return this.state[`${id}${name}`]
  }

  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;

    return (
      <div className="battle-container">
        <div className="row">
          {!playerOneName ?
            <PlayerInput 
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            ></PlayerInput> :
            <PlayerAvatar 
              playerImage={this.getStateAttribute('playerOne', 'Image')}
              username={this.getStateAttribute('playerOne', 'Name')}
            >
              <a
                className="player_avatar__reset_link"
                onClick={this.resetPlayer.bind(null, 'playerOne')}
              >Reset</a>
            </PlayerAvatar>
          }    
          {!playerTwoName ?
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            ></PlayerInput> :
            <PlayerAvatar
              playerImage={this.getStateAttribute('playerTwo', 'Image')}
              username={this.getStateAttribute('playerTwo', 'Name')}
            >
              <a
                className="player_avatar__reset_link"
                onClick={this.resetPlayer.bind(null, 'playerTwo')}
              >Reset</a>
            </PlayerAvatar>
          } 
        </div>

        { playerOneName && playerTwoName &&
          <div className="row">
            <Link className="button" to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>Battle</Link>
          </div>
        }
      </div>
    )
  }
}