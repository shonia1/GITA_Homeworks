import { useEffect, useState } from "react";

interface HeaderProps {
  headerBg: string;
}

export function Header({ headerBg }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
  });

  return (
    <div className="app-header" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="header-overlay">
        <span className="current-date">{formattedDate}</span>
        <h1 className="current-time">{formattedTime}</h1>
      </div>
    </div>
  );
}