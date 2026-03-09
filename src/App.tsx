import React from 'react';
import './App.css';
import Main from './pages/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <Main />
            </ErrorBoundary>
        </div>
    );
}

export default App;
