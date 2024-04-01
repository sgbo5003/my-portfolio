import React, { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { WithChildren } from '../../helpers';

const AngkorSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(undefined);

const AngkorSplashScreenProvider: FC<WithChildren> = ({ children }) => {
  const [count, setCount] = useState(0);
  const visible = count > 0;

  useEffect(() => {
    const splashScreen = document.getElementById('splash-screen');

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove('hidden');

      return () => {
        splashScreen.classList.add('hidden');
      };
    }

    // Hide SplashScreen
    let timeout: number;
    if (splashScreen && !visible) {
      timeout = window.setTimeout(() => {
        splashScreen.classList.add('hidden');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return <AngkorSplashScreenContext.Provider value={setCount}>{children}</AngkorSplashScreenContext.Provider>;
};

const LayoutSplashScreen: FC<{ visible?: boolean }> = ({ visible = true }) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(AngkorSplashScreenContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (setCount) {
      setCount((prev) => prev + 1);
    }

    return () => {
      if (setCount) {
        setCount((prev) => prev - 1);
      }
    };
  }, [setCount, visible]);

  return null;
};

export { AngkorSplashScreenProvider, LayoutSplashScreen };
