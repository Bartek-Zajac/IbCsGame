import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#222',
  parent: null,
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  // Load the background image from public/assets/map.jpg
  this.load.image('background', 'assets/map.jpg');
}

function create() {
  // Add the background image, positioned at the top-left corner
  this.add.image(0, 0, 'background').setOrigin(0, 0);

  this.add.text(200, 250, 'Hello React + Phaser.js!', { font: '32px Arial', fill: '#fff' });
}

function update() {
  // Main game loop
}

const GameContainer = () => {
  const phaserRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      phaserConfig.parent = phaserRef.current;
      gameRef.current = new Phaser.Game(phaserConfig);
    }
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={phaserRef}
      style={{
        width: phaserConfig.width,
        height: phaserConfig.height,
        margin: '0 auto',
        border: '2px solid #333'
      }}
    />
  );
};

export default GameContainer;
