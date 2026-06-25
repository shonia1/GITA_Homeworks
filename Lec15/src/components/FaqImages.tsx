import patternDesktopImg from "../assets/bg-pattern-desktop.svg";
import patternMobileImg from "../assets/bg-pattern-mobile.svg";
import boxImg from "../assets/illustration-box-desktop.svg";
import desktopImg from "../assets/illustration-woman-online-desktop.svg";
import mobileImg from "../assets/illustration-woman-online-mobile.svg";

export default function FaqImages() {
  return (
    <>
      <div className="image-container">
        <div className="mobile-image-block">
          {/* მობილურის სურათი */}
          <img
            src={mobileImg}
            alt="illustration"
            className="mobile-only-img hero-img"
          />
          {/* მობილურის უკანა პატერნი */}
          <img
            src={patternMobileImg}
            alt="pattern"
            className="mobile-only-img pattern-img"
          />
        </div>
        <div className="desktop-image-block">
          {/* დესკტოპის სურათი */}
          <img
            src={desktopImg}
            alt="illustration"
            className="desktop-only-img"
          />
          {/* დესკტოპის უკანა პატერნი */}
          <img
            src={patternDesktopImg}
            alt="pattern"
            className="desktop-only-img"
          />
        </div>

        {/* ყუთის სურათი */}
        <img src={boxImg} alt="box" className="box-img" />
      </div>
    </>
  );
}
