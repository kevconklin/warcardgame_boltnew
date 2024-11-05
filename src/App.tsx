import React, { useState, useCallback, useEffect } from 'react';
import { Card as CardComponent } from './components/Card';
import { GameControls } from './components/GameControls';
import { createDeck } from './utils/deck';
import { Card, GameState } from './types/card';
import { Swords } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerDeck: [],
    computerDeck: [],
    playerCard: null,
    computerCard: null,
    warPile: [],
    gameStatus: '',
    isWar: false,
  });

  useEffect(() => {
    const deck = createDeck();
    const mid = Math.floor(deck.length / 2);
    setGameState(prev => ({
      ...prev,
      playerDeck: deck.slice(0, mid),
      computerDeck: deck.slice(mid),
    }));
  }, []);

  const handleDraw = useCallback(() => {
    setGameState(prev => {
      if (prev.playerDeck.length === 0 || prev.computerDeck.length === 0) {
        return {
          ...prev,
          gameStatus: prev.playerDeck.length === 0 ? 'Computer Wins!' : 'Player Wins!',
        };
      }

      const playerCard = prev.playerDeck[0];
      const computerCard = prev.computerDeck[0];
      const playerDeck = prev.playerDeck.slice(1);
      const computerDeck = prev.computerDeck.slice(1);
      const warPile = [...prev.warPile, playerCard, computerCard];

      if (playerCard.numericValue === computerCard.numericValue) {
        return {
          ...prev,
          playerDeck,
          computerDeck,
          playerCard,
          computerCard,
          warPile,
          isWar: true,
          gameStatus: 'War!',
        };
      }

      const winner = playerCard.numericValue > computerCard.numericValue ? 'player' : 'computer';
      const updatedState = {
        ...prev,
        playerCard,
        computerCard,
        warPile: [],
        isWar: false,
        gameStatus: winner === 'player' ? 'You win this round!' : 'Computer wins this round!',
      };

      if (winner === 'player') {
        updatedState.playerDeck = [...playerDeck, ...warPile];
      } else {
        updatedState.computerDeck = [...computerDeck, ...warPile];
      }

      return updatedState;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex flex-col items-center justify-between p-8">
      <div className="text-white text-3xl font-bold mb-8">War Card Game</div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <CardComponent card={gameState.computerCard} isComputer />
        
        {gameState.isWar && (
          <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
            <Swords size={24} />
            <span className="text-2xl font-bold">WAR!</span>
            <Swords size={24} />
          </div>
        )}
        
        <CardComponent card={gameState.playerCard} />
        
        <div className="mt-8">
          <GameControls
            onDraw={handleDraw}
            disabled={gameState.playerDeck.length === 0 || gameState.computerDeck.length === 0}
            deckCount={{
              player: gameState.playerDeck.length,
              computer: gameState.computerDeck.length,
            }}
          />
        </div>
        
        {gameState.gameStatus && (
          <div className={`mt-4 text-xl font-bold ${
            gameState.gameStatus.includes('You win') ? 'text-green-400' :
            gameState.gameStatus.includes('Computer wins') ? 'text-red-400' :
            'text-yellow-400'
          }`}>
            {gameState.gameStatus}
          </div>
        )}
      </div>
      
      <div className="text-gray-300 text-sm">
        Click "Draw Card" to play against the computer
      </div>
    </div>
  );
}

export default App;