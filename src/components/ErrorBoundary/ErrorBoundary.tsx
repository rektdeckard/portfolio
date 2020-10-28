import { LinkBreak } from "phosphor-react";
import React from "react";
import "./ErrorBoundary.css";

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Object, ErrorState> {
  constructor(props: Object) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: Object) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container">
        <LinkBreak size={128} weight="duotone" />
        <p>Oops, something went wrong!</p>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
