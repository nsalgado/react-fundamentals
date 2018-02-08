import React from 'react'
import PropTypes from 'prop-types'
import { FetchPopularRepos } from '../utils/api'
import Loading from './Loading'


class RepoGrid extends React.Component {

  render () {
    return (
      <ul className="popular-list">
        {this.props.repos.map((r, index) => {
          return (
            <li className="popular-item" key={r.id}> 
              <div className="popular-item__rank">
                <span>#{index + 1}</span>
              </div>
              <div className="popular-item__avatar">
                <img alt={'Avatar for ' + r.owner.login} className="popular-item__avatar__img" src={r.owner.avatar_url}/>
              </div>
              <div className="popular-item__info_block">
                <span className="popular-item__info_block__text"><a href={ r.html_url }>{r.name}</a></span>
                <span className="popular-item__info_block__text">@{r.owner.login}</span>
                <span className="popular-item__info_block__text">{r.stargazers_count} stars</span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

RepoGrid.propTypes = {
  Repos: PropTypes.array.isRequired
}


class Filter extends React.Component {
  constructor (props) {
    super(props);
    this.languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  }

  render () {
    return (
      <ul className="languages">
        {this.languages.map((lang) => {
          return (
            <li
              style={lang === this.props.selectedLanguage ? { 'color': 'red' } : null}
              onClick={this.props.onSelect.bind(null, lang)}
              key={lang}
            >
              {lang}
            </li>
          )
        })}
      </ul>
    )
  }
}

Filter.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default class Popular extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      'selectedLanguage': 'All',
      'repos': null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(lang) {
    this.setState(() => {
      return {
        'selectedLanguage': lang,
        'repos': null
      }
    })

    this.fetchRepos.fetch(lang).then((repos) => {
      this.setState(() => {
        return {
          'repos': repos
        }
      })
    })
  }

  componentDidMount () {
    this.fetchRepos = new FetchPopularRepos()
    this.updateLanguage(this.state.selectedLanguage);
  }

  render () {  
    return (
      <div>
        <Filter 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        ></Filter>
        {!this.state.repos ? 
          <Loading text="Downloading"></Loading> : 
          <RepoGrid repos={this.state.repos}></RepoGrid>
        }
      </div>
    )
  }
}