import { React } from 'play-js-react';

export function CaretRight(props) {
  return (
    <svg width="0.5em" height="1em" viewBox="4 0 9 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
    </svg>
  );
}

export function Star(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="star1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ccf"/>
          <stop offset="33%" stop-color="#88f"/>
          <stop offset="66%" stop-color="#88f"/>
          <stop offset="100%" stop-color="#44f"/>
        </linearGradient>
        <linearGradient id="star2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#0ff"/>
          <stop offset="33%" stop-color="#0bf"/>
          <stop offset="66%" stop-color="#0bf"/>
          <stop offset="100%" stop-color="#08f"/>
        </linearGradient>
        <linearGradient id="star3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#8f8"/>
          <stop offset="33%" stop-color="#4b4"/>
          <stop offset="66%" stop-color="#4b4"/>
          <stop offset="100%" stop-color="#080"/>
        </linearGradient>
        <linearGradient id="star4" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ff0"/>
          <stop offset="33%" stop-color="#fb0"/>
          <stop offset="66%" stop-color="#fb0"/>
          <stop offset="100%" stop-color="#f80"/>
        </linearGradient>
        <linearGradient id="star5" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#fcc"/>
          <stop offset="33%" stop-color="#f88"/>
          <stop offset="66%" stop-color="#f88"/>
          <stop offset="100%" stop-color="#f44"/>
        </linearGradient>
      </defs>
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  );
}
