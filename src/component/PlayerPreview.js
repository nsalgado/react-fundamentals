import React from 'react'
import PropTypes from 'prop-types'

export default class PlayerAvatar extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="player_avatar">
        <img 
          className="player_avatar__image" 
          src={this.props.playerImage}
          alt={'Avatar for ' + this.props.username}
        />
        <span className="player_avatar__username">
          @{this.props.username}
        </span>
				{ this.props.children }
      </div>
    )
  }
} 

PlayerAvatar.propTypes = {
  playerImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}