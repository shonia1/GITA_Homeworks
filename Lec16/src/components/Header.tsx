import { useEffect, useState } from "react";

interface HeaderProps {
  headerBg: string;
}

//Header კომპონენტი — პასუხისმგებელია მიმდინარე დროისა და თარიღის რეალურ დროში ჩვენებაზე.
export function Header({ headerBg }: HeaderProps) {
  // მიმდინარე დროის სტეიტი
  const [currentTime, setCurrentTime] = useState(new Date());

  //ტაიმერის გაშვება კომპონენტის ჩატვირთვისას
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    // ტაიმერის გასუფთავება კომპონენტის დემოუნტისას
    return () => clearInterval(timer);
  }, []);

  //საათის ფორმატირება
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  //თარიღის ფორმატირება
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
