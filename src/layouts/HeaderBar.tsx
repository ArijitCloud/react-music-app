import { useState } from "react";
import logo from "../assets/logo.svg";
import { SearchBox } from "../components";

const HeaderBar = () => {
  const [showLogo, setShowLogo] = useState(true);
  return (
    <header className="flex sm:gap-10 justify-between mb-6">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showLogo ? "flex" : "hidden sm:flex"
        }`}
      >
        <a href="/">
          <img src={logo} alt="React Music App" className="h-8" />
        </a>
      </div>
      <SearchBox onSmallSBToggle={() => setShowLogo(!showLogo)} />
    </header>
  );
};

export { HeaderBar };
