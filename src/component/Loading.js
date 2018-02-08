import React from 'react'
import PropTypes from 'prop-types'

var styles = {
  'content': {
    'textAlign': 'center',
    'fontSize': '35px'
  }
}

export default class Loading extends React.Component {
  
  constructor (props) {
    super(props)

    this.state = {
      text: props.text
    }
  }
  
  render () {
    return (
      <p style={styles.content}>
        {this.props.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

Loading.defaultProps = {
  text: 'Loading'
}
