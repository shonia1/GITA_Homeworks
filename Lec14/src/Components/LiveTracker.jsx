import { useEffect } from "react";
import "../App.css"

export default function LiveTracker() {
  useEffect(() => {
    console.log("Live სინქრონიზაცია დაიწყო!");
    const interval = setInterval(() => {
      console.log("ამინდის მონაცემები სინქრონიზებულია");
    }, 2000);
    //ეს ფუნქცია მაშინ გაეშვება როცა ლაივტრეკერის თოგლი გამოირთვება
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="live-sync-info">
      <p>Live სინქრონიზაცია ჩართულია</p>
    </div>
  );
}
