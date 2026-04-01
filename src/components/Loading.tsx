import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100 && !isLoaded) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Drastically reduced from 1.6s for snappier feel
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 300); // Reduced from 900ms
      }
    });
  }, [isLoaded]);

  return (
    <div className={`loading-screen-liquid ${clicked ? "loading-exit-liquid" : ""}`}>
      {/* Dynamic Liquid Mesh Background */}
      <div className="liquid-mesh-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Glassmorphic Presentation Card */}
      <div className="glass-card">
        <div className="glass-card-content">
          <h1 className="liquid-logo">AU</h1>
          <div className="liquid-percentage-wrapper">
            <p className="liquid-percentage-text">{percent}<span>%</span></p>
            <div className="liquid-percentage-bar-bg">
              <div className="liquid-percentage-bar" style={{ width: `${percent}%` }}></div>
            </div>
          </div>
          <p className="liquid-status">
            {percent >= 100 ? "Sync Complete" : "Establishing Connection..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Faster initial simulation
  let interval = setInterval(() => {
    if (percent <= 60) {
      let rand = Math.round(Math.random() * 12) + 5; // Faster increments
      percent = Math.min(60, percent + rand);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random() * 2);
        setLoading(Math.min(98, percent));
        if (percent >= 98) {
          clearInterval(interval);
        }
      }, 500); // Faster updates for final stretch
    }
  }, 40); // Faster initial interval

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 4; // Faster jump to 100% when assets ready
          setLoading(Math.min(100, percent));
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};
