import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

const TARGET_LABEL = '23 April 2026, 16:20 CET/CEST';
const TARGET_TIME_UTC = Date.parse('2026-04-23T14:20:00.000Z');
const FIREWORKS_EMBED_URL =
  'https://www.youtube-nocookie.com/embed/5hIgnDMp3EI?autoplay=1&mute=1&rel=0';

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeLeft() {
  const difference = Math.max(TARGET_TIME_UTC - Date.now(), 0);
  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    complete: difference === 0,
    parts: [days, hours, minutes, seconds],
    text: `${days} dagar ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
  };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  useEffect(() => {
    if (timeLeft.complete) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft.complete]);

  const statusText = useMemo(() => {
    if (timeLeft.complete) {
      return '0 dagar 00:00:00';
    }

    return timeLeft.text;
  }, [timeLeft]);

  return (
    React.createElement('main', { className: 'app' },
      React.createElement('section', { className: 'panel' },
        React.createElement('h1', { className: 'message' }, 'Tími þangað til Monique og Pabbi hittast aftur!'),
        React.createElement('p', { className: 'countdown', 'aria-live': 'polite' }, statusText),
        React.createElement('p', { className: 'caption' }, TARGET_LABEL),
        timeLeft.complete && React.createElement('div', { className: 'video-wrap' },
          React.createElement('iframe', {
            className: 'video',
            src: FIREWORKS_EMBED_URL,
            title: 'Fireworks celebration video',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            referrerPolicy: 'strict-origin-when-cross-origin',
            allowFullScreen: true,
          })
        )
      )
    )
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
