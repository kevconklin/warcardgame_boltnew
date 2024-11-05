import React from 'react';
import { Card as CardType } from '../types/card';

interface CardProps {
  card: CardType | null;
  isComputer?: boolean;
}

export function Card({ card, isComputer = false }: CardProps) {
  if (!card) return null;

  const color = card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black';
  
  return (
    <div className={`w-32 h-48 bg-white rounded-lg shadow-lg border-2 border-gray-200 flex flex-col justify-between p-4 ${isComputer ? 'mb-8' : 'mt-8'}`}>
      <div className={`text-xl font-bold ${color}`}>
        {card.value}
        <span className="ml-1">{card.suit}</span>
      </div>
      <div className={`text-4xl ${color} self-center`}>
        {card.suit}
      </div>
      <div className={`text-xl font-bold ${color} self-end rotate-180`}>
        {card.value}
        <span className="ml-1">{card.suit}</span>
      </div>
    </div>
  );
}