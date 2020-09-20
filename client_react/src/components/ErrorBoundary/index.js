import React from 'react';
import './index.css';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div id="error">
                    <div id="box"></div>
                    <h3>Something went wrong</h3>
                    <span>Please come back later</span>
                    <p>We are trying to resolve it</p>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}