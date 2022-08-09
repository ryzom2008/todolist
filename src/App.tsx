import React, {useState} from 'react';
import './App.css';
import {Game, Score} from "./index";

type Props = {
    games: Game[];
    scores: Score[];
}

const App = ({games, scores}:Props) => {
    const [upcomingGames, setUpcomingGames] = useState<Game[]>(games);
    const [finishedGames, setFinishedGames] = useState<Game[]>([]);
    const [currentGame, setCurrentGame] = useState<Game | null>(null);
    const startGame = () => {
        const [nextGame, ...restGames] = upcomingGames;
        setCurrentGame(nextGame as Game);
        setUpcomingGames(restGames);
    }
    const onScoreUpdate = () => {
        const currentGameScore = scores.find(el => el.gameId === currentGame?.id);
        if (currentGameScore) {
            const updatedGame = {
                ...currentGame,
                home: {...currentGame?.home, score: currentGameScore.home},
                away: {...currentGame?.away, score: currentGameScore.away}
            }
            setCurrentGame(updatedGame as Game);
        }
    }
    const onGameFinish = () => {
        const sortedFinishedGames = [currentGame as Game, ...finishedGames]
            .sort((g1, g2) => (g2.home.score + g2.away.score) - (g1.home.score + g1.away.score));
        setFinishedGames(sortedFinishedGames);
        setCurrentGame(null);
    }
    return (
        <div className="container">
            <div className="gamesList">
                <h3>Upcoming games</h3>
                {upcomingGames.map(el => <div
                    data-testid="upcoming-game"
                    key={el.id}>{el.home.country} - {el.away.country}</div>)}
            </div>
            <div>
                <div className="score">
                    <div className="score-item">
                        <h4>home team</h4>
                        <span data-testid="home-team">{currentGame?.home.country}</span>
                    </div>
                    <div className="score-item">
                        <h4>score</h4>
                        <span data-testid="score">{currentGame?.home.score || 0} - {currentGame?.away.score || 0}</span>
                    </div>
                    <div className="score-item">
                        <h4>away team</h4>
                        <span data-testid="away-team">{currentGame?.away.country}</span>
                    </div>
                </div>
                <div className="actions">
                    {currentGame &&
                    <>
                      <button className="button" onClick={onScoreUpdate}>Update</button>
                      <button className="button" onClick={onGameFinish}>Finish</button>
                    </>}
                    {!currentGame && !!upcomingGames.length &&
                    <button className="button" onClick={startGame}>Start</button>
                    }
                    {!upcomingGames.length && !currentGame && <div>No upcoming games</div>}
                </div>
            </div>
            <div className="gamesList">
                <h3>Finished games</h3>
                {finishedGames.map(el => <div
                    data-testid="finished-game"
                    key={el.id}>{el.home.country} {el.home.score} - {el.away.country} {el.away.score}</div>)}
            </div>
        </div>
    );
}

export default App;
