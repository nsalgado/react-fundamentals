import React from "react";
import { PropTypes } from "prop-types";
import queryString from 'query-string'
import { BattleService } from '../utils/api'
import PlayerAvatar from './PlayerPreview'
import Link from "react-router-dom/Link"
import Loading from './Loading'


function Profile (props) {
	return (
		<div>
			<PlayerAvatar
				playerImage={props.info.avatar_url}
				username={props.info.login}
			>
				<ul className='space-list-items'>
					{props.info.name && <li>{props.info.name}</li>}
					{props.info.location && <li>{props.info.location}</li>}
					{props.info.company && <li>{props.info.company}</li>}
					<li>Followers: {props.info.followers}</li>
					<li>Following: {props.info.following}</li>
					<li>Public Repos: {props.info.public_repos}</li>
					{props.info.blog && <li><a href={props.info.blog}>{props.info.blog}</a></li>}
				</ul>
			</PlayerAvatar>
		</div>
	)
}

Profile.protoTypes = {
	info: PropTypes.object.isRequired
}


function Player (props) {
	return (
		<div>
			<h1 className="header">{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			<div>
				<Profile
					info={props.profile}
				></Profile>
			</div>
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired,
}



export default class Results extends React.Component {
	
	constructor (props) {
		super(props)
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount () {
		this.players = queryString.parse(this.props.location.search)
		this.battleService = new BattleService()
		this.battleService.calculate([
			this.players.playerOneName,
			this.players.playerTwoName
		]).then((results) => {
			if (results === null) {
				return this.setState(() => {
					return {
						error: 'looks like there was an error. Check if both users exists on Github',
						loading: false
					}
				})
			}

			return this.setState(() => {
				return {
					winner: results[0],
					loser: results[1],
					errors: null,
					loading: false
				}
			})

		}).catch((error) => {
			console.error(error)
		});
	}

	render () {
		if (this.state.loading) {
			return <Loading/>
		} 
		if (this.state.error) {
			return (
				<div>
					<p>{this.state.error}</p>
					<Link to="/battle">Reset</Link>
				</div>
			)
		}

		return (
			<div className="row">
				<Player
					label="Winner"
					score={this.state.winner.score}
					profile={this.state.winner.profile}
				></Player>

				<Player
					label="Loser"
					score={this.state.loser.score}
					profile={this.state.loser.profile}
				></Player>
			</div>
		)
	}
}