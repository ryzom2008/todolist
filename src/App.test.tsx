import React from 'react';
import {fireEvent, render, RenderResult} from '@testing-library/react';
import App from './App';
import {Game, Score} from "./index";

const testGames: Game[] = [
    {id: 1, home: {country: 'Mexico', score: 0}, away: {country: 'Canada', score: 0}},
    {id: 2, home: {country: 'Spain', score: 0}, away: {country: 'Brazil', score: 0}},
    {id: 3, home: {country: 'Germany', score: 0}, away: {country: 'France', score: 0}},
];

const testScores: Score[] = [
    {gameId: 1, home: 0, away: 5},
    {gameId: 2, home: 10, away: 2},
    {gameId: 3, home: 6, away: 6},
];

describe("App", () => {
    let component: RenderResult;
    beforeEach(() =>{
        component = render(<App games={testGames} scores={testScores}/>)
    });

    test('should render component correctly', () => {
        expect(component).toMatchSnapshot();
    });

    test('should set a current game', () => {
        const startButton = component.getByText('Start');
        fireEvent.click(startButton);
        const homeTeamEl = component.getByTestId('home-team');
        const awayTeamEl = component.getByTestId('away-team');
        const scoreEl = component.getByTestId('score');
        const updateButton = component.getByText('Update');
        const finishButton = component.getByText('Finish');
        expect(homeTeamEl.textContent).toEqual('Mexico');
        expect(awayTeamEl.textContent).toEqual('Canada');
        expect(scoreEl.textContent).toEqual('0 - 0');
        expect(startButton).not.toBeInTheDocument();
        expect(updateButton).toBeInTheDocument();
        expect(finishButton).toBeInTheDocument();
    });

    test('should update a current game score', () => {
        const startButton = component.getByText('Start');
        fireEvent.click(startButton);
        const updateButton = component.getByText('Update');
        fireEvent.click(updateButton);
        const scoreEl = component.getByTestId('score');

        expect(scoreEl.textContent).toEqual('0 - 5');
    });

    test('should finish a current game', () => {
        const startButton = component.getByText('Start');
        fireEvent.click(startButton);
        const updateButton = component.getByText('Update');
        const finishButton = component.getByText('Finish');
        const scoreEl = component.getByTestId('score');
        fireEvent.click(updateButton);
        fireEvent.click(finishButton);
        expect(scoreEl.textContent).toEqual('0 - 0');
        const upcomingGames = component.getAllByTestId('upcoming-game').map(el => el.textContent);
        const finishedGames = component.getAllByTestId('finished-game').map(el => el.textContent);
        expect(upcomingGames).toEqual([
            "Spain - Brazil",
            "Germany - France",
        ]);
        expect(updateButton).not.toBeInTheDocument();
        expect(finishButton).not.toBeInTheDocument();
        expect(component.getByText('Start')).toBeInTheDocument();
        expect(finishedGames).toEqual(["Mexico 0 - Canada 5"]);
    });

    test('should show "no upcoming games" message when all the games are finished', () => {
        let upcomingGamesDivs = component.queryAllByTestId('upcoming-game');
        let updateButton, finishButton, startButton;
        while (upcomingGamesDivs.length) {
            startButton = component.queryByText('Start');
            fireEvent.click(startButton as HTMLElement);
            updateButton = component.getByText('Update');
            finishButton = component.getByText('Finish');
            fireEvent.click(updateButton);
            fireEvent.click(finishButton);
            upcomingGamesDivs = component.queryAllByTestId('upcoming-game');
        }
        const upcomingGames = upcomingGamesDivs.map(el => el.textContent);
        const finishedGames = component.getAllByTestId('finished-game').map(el => el.textContent);
        expect(upcomingGames).toEqual([]);
        expect(updateButton).not.toBeInTheDocument();
        expect(finishButton).not.toBeInTheDocument();
        expect(startButton).not.toBeInTheDocument();
        expect(finishedGames).toEqual([
            "Germany 6 - France 6",
            "Spain 10 - Brazil 2",
            "Mexico 0 - Canada 5",
        ]);
        expect(component.getByText("No upcoming games")).toBeInTheDocument();
    })
});
