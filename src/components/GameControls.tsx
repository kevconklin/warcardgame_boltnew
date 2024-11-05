import React from 'react';
import { Play } from 'lucide-react';

interface GameControlsProps {
  onDraw: () => void;
  disabled: boolean;
  deckCount: { player: number; computer: number };
}

export function GameControls({ onDraw, disabled, deckCount }: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-8 text-lg font-semibold">
        <span>Your Cards: {deckCount.player}</span>
        <span>Computer Cards: {deckCount.computer}</span>
      </div>
      <button
        onClick={onDraw}
        disabled={disabled}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Play size={20} />
        Draw Card
      </button>
    </div>
  );
}