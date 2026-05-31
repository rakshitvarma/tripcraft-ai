import { Component } from 'react'

/**
 * Class-based error boundary — catches render errors in the subtree and
 * shows a recovery UI instead of an empty screen.
 *
 * Must be a class component; React does not yet support hook-based boundaries.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    /** @type {{ hasError: boolean, message: string }} */
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Unknown error' }
  }

  componentDidCatch(error, info) {
    console.error('[TripCraft] Unhandled render error:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center"
        role="alert"
        aria-live="assertive"
      >
        <span className="text-5xl" aria-hidden="true">⚠️</span>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {this.state.message}
        </p>
        <button
          type="button"
          onClick={this.handleReset}
          className="btn-primary mt-2"
        >
          Try again
        </button>
      </div>
    )
  }
}
