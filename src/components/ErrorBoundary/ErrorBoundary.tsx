import React, { Component, ErrorInfo, ReactNode } from 'react';

import './ErrorBoundary.css';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="error-boundary" role="alert">
                    <h2 className="error-boundary__title">Что-то пошло не так</h2>
                    <p className="error-boundary__message">
                        {this.state.error?.message ?? 'Unrecognized error occurred.'}
                    </p>
                    <button className="error-boundary__btn" onClick={this.handleReset}>
                        Попробовать снова
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

