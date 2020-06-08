import { Component, ErrorInfo } from 'react'

export default class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    return this.props.children
  }
}
