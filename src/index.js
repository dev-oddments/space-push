import React, { Component } from 'react'
import { SpaceshipTakeoff } from './Spaceship'


const detectGitPush = (data) => {
  const patterns = 
  ['To .+.git', 'Everything up+',]
  const antiPattern = /CONFLICT/
  
  return new RegExp(`(${patterns.join(')|(')})`).test(data) && !antiPattern.test(data)
}

export const middleware = (store) => (next) => (action) => {
  if ('SESSION_ADD_DATA' === action.type) {
    const { data } = action;

    if (detectGitPush(data)) {
      store.dispatch({
        type: 'TOGGLE_PUSH_ROCKET'
      })
    }

    next(action)
  } else {
    next(action)
  }
}

export function reduceUI(state, action) {
  switch (action.type) {
    case 'TOGGLE_PUSH_ROCKET': {
      if (state.pushRocket === undefined ) {
        return state.set('pushRocket', 1)
      } else {
        return state.set('pushRocket', state.pushRocket + 1)
      }
    }
  }
  return state
}

export function mapTermsState(state, map) {
  return Object.assign(map, {
    pushRocket: state.ui.pushRocket
  })
}


const passProps = (uid, parentProps, props) => {
  return Object.assign(props, {
    pushRocket: parentProps.pushRocket
  })
}

export { passProps as getTermGroupProps }
export { passProps as getTermProps }

export function decorateTerm(Term) {
  return class extends Component {
    constructor (props, context) {
      super(props,context)
      this.state = {
        displayPushRocket: false
      }
    }

    onTerminal(term) {
      if (this.props.onTerminal) this.props.onTerminal(term);
      this._div = term.div_;
      this._window = term.document_.defaultView;
    }

    componentWillReceiveProps(nextProps) {
      if((nextProps.pushRocket > this.props.pushRocket) || (nextProps.pushRocket === 1 && this.props.pushRocket === undefined)) {
        this.setState({displayPushRocket: true})
      }
    }

    onAnimationEnd(event) {
      setTimeout(() => {
        this.setState({
          displayPushRocket: false
        })
      }, 15000)
    }

    render () {
      return( 
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {React.createElement(Term, Object.assign({}, this.props, {
            onTerminal: this._onTerminal,
          }))}
          <SpaceshipTakeoff display={this.state.displayPushRocket} onAnimationEnd={this.onAnimationEnd.bind(this)}/>
      </div>
      )
    }
  }
}
