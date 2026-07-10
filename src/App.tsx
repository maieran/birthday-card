import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import welcomeImage from './assets/screens/welcome.png';
import giftsImage from './assets/screens/gifts.png';
import cakeImage from './assets/screens/cake.png';
import flowerImage from './assets/screens/flower.png';
import letterImage from './assets/screens/letter.png';
import letterRevealImage from './assets/screens/letter-reveal.png';
import photoboothImage from './assets/screens/photobooth.png';
import photoStripImage from './assets/screens/photo-strip.png';

import './App.css';


type ScreenName =
  | 'welcome'
  | 'gifts'
  | 'cake'
  | 'flower'
  | 'letter'
  | 'letterReveal'
  | 'photobooth';

interface ScreenFrameProps {
  image: string;
  alt: string;
  children?: ReactNode;
}

function ScreenFrame({
  image,
  alt,
  children,
}: ScreenFrameProps) {
  return (
    <main className="screen-frame">
      <img
        className="screen-frame__background"
        src={image}
        alt={alt}
        draggable={false}
      />

      {children}
    </main>
  );
}

interface HotspotProps {
  className: string;
  label: string;
  onClick: () => void;
}

function Hotspot({
  className,
  label,
  onClick,
}: HotspotProps) {
  return (
    <button
      type="button"
      className={`hotspot ${className}`}
      aria-label={label}
      onClick={onClick}
    />
  );
}

export default function App() {
  const [screen, setScreen] =
    useState<ScreenName>('welcome');

  const [photoPrinted, setPhotoPrinted] =
    useState(false);

  const changeScreen = (nextScreen: ScreenName) => {
    setScreen(nextScreen);

    if (nextScreen !== 'photobooth') {
      setPhotoPrinted(false);
    }
  };

  // after-delay
  useEffect(() => {
    if (screen !== 'photobooth') {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhotoPrinted(true);
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [screen]);

  switch (screen) {
    case 'welcome':
      return (
        <div className="app">
          <ScreenFrame
            image={welcomeImage}
            alt="Привітальна листівка з днем народження"
          >
            <Hotspot
              className="hotspot--welcome"
              label="Відкрити подарунки"
              onClick={() => changeScreen('gifts')}
            />
          </ScreenFrame>
        </div>
      );

    case 'gifts':
      return (
        <div className="app">
          <ScreenFrame
            image={giftsImage}
            alt="Три подарунки для тебе"
          >
            <Hotspot
              className="hotspot--gift-letter"
              label="Відкрити повідомлення"
              onClick={() => changeScreen('letter')}
            />

            <Hotspot
              className="hotspot--gift-flower"
              label="Відкрити квіти"
              onClick={() => changeScreen('flower')}
            />

            <Hotspot
              className="hotspot--gift-cake"
              label="Відкрити торт"
              onClick={() => changeScreen('cake')}
            />
          </ScreenFrame>
        </div>
      );

    case 'cake':
      return (
        <div className="app">
          <ScreenFrame
            image={cakeImage}
            alt="Святковий торт"
          >
            <Hotspot
              className="hotspot--bottom"
              label="Прийняти торт"
              onClick={() => changeScreen('gifts')}
            />
          </ScreenFrame>
        </div>
      );

    case 'flower':
      return (
        <div className="app">
          <ScreenFrame
            image={flowerImage}
            alt="Святкові квіти"
          >
            <Hotspot
              className="hotspot--bottom"
              label="Прийняти квіти"
              onClick={() => changeScreen('gifts')}
            />
          </ScreenFrame>
        </div>
      );

    case 'letter':
      return (
        <div className="app">
          <ScreenFrame
            image={letterImage}
            alt="Закритий святковий лист"
          >
            <Hotspot
              className="hotspot--envelope"
              label="Відкрити лист"
              onClick={() => changeScreen('letterReveal')}
            />
          </ScreenFrame>
        </div>
      );

    case 'letterReveal':
      return (
        <div className="app">
          <ScreenFrame
            image={letterRevealImage}
            alt="Особистий лист"
          >
            <Hotspot
              className="hotspot--bottom"
              label="Перейти до фотобудки"
              onClick={() => changeScreen('photobooth')}
            />
          </ScreenFrame>
        </div>
      );
    
    case 'photobooth':
      return (
        <div className="app">
          <ScreenFrame
            image={photoboothImage}
            alt="Святкова фотобудка"
          >
            <div
              className={
                photoPrinted
                  ? 'printer-output printer-output--visible'
                  : 'printer-output'
              }
            >
              <img
                className="printer-output__strip"
                src={photoStripImage}
                alt="Фотографії наших спогадів"
                draggable={false}
              />
            </div>

            <Hotspot
              className="hotspot--bottom"
              label="Повернутися на початок"
              onClick={() => changeScreen('welcome')}
            />
          </ScreenFrame>
        </div>
      );
  }
}