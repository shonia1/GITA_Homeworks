import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <>{/*ჰედერი*/}
      <header className="app-header">
        <h1 className="app-title">devfinder</h1>
        <button
          type="button"
          className="app-theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <>
              LIGHT <img src="/sun-icon.svg" alt="sun-icon" />
            </>
          ) : (
            <>
              DARK <img src="/moon-icon.svg" alt="moon-icon" />
            </>
          )}
        </button>
      </header></>
  );
}
