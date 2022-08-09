import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export type Team = { country: string, score: number };
export type Game = { id: number, home: Team, away: Team };
export type Score = { gameId: number, home: number, away: number };

const scores: Score[] = [
    {gameId: 1, home: 0, away: 5},
    {gameId: 2, home: 10, away: 2},
    {gameId: 3, home: 2, away: 2},
    {gameId: 4, home: 6, away: 6},
    {gameId: 5, home: 3, away: 1}
];

const games: Game[] = [
    {id: 1, home: {country: 'Mexico', score: 0}, away: {country: 'Canada', score: 0}},
    {id: 2, home: {country: 'Spain', score: 0}, away: {country: 'Brazil', score: 0}},
    {id: 3, home: {country: 'Germany', score: 0}, away: {country: 'France', score: 0}},
    {id: 4, home: {country: 'Uruguay', score: 0}, away: {country: 'Italy', score: 0}},
    {id: 5, home: {country: 'Argentina', score: 0}, away: {country: 'Australia', score: 0}},
];

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App games={games} scores={scores}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
