import React from "react";
import "./home.styles.scss";
import { useNavigate } from "react-router";
import Lottie from "react-lottie";
import LandingAnimation from "../../assets/lottie/38834-service-animation.json";
import ServiceAnimation from "../../assets/lottie/106544-people-quality-assurance-software-fixing-bugs-hardware-device-application-it-service-concept-animation-in-json-and-ae-format.json";
import UpNextAnimation from "../../assets/lottie/8633-web-development.json";
import CustomLandingButton from "../../components/button/customLandingButton.component";

const Home = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LandingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const serviceOptions = {
    loop: true,
    autoplay: true,
    animationData: ServiceAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const constructionOptions = {
    loop: true,
    autoplay: true,
    animationData: UpNextAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="home__page">
      <div className="section__1">
        <div className="upper__left">
          <p className="tag__line">
            Build your programming <br /> future in the best way
          </p>
          <p className="below__line">
            Collaborate and grow in the best way. Build and join leading
            communities, interact with the best people, get all your things
            solved at one stop.
          </p>
          <div className="landing__button">
            <CustomLandingButton title={"Get Started"} onClick={() => {
              // navigate to register page
              navigate("/register");
            }} />
          </div>
          <p className="powered__by">POWERED BY</p>
          {/* todo -> put symbols here later */}
          <p className="stack">NodeJS ReactJS MongoDB SocketIO</p>
        </div>
        <div className="upper__right">
          {/* <img src={LandingImage} alt="landing-image" className="landing__image"/> */}
          <Lottie options={defaultOptions} />
        </div>
      </div>

      <div className="section__2">
        <p className="section__2__title">OUR FEATURES</p>
        <div className="section__2__inner__wrapper">
          <div className="left__part">
            <Lottie options={serviceOptions} height={"100%"} width={"100%"} />
          </div>
          <div className="right__part">
            <ul className="points">
              <li className="points__item">Make Connections</li>
              <li className="points__item">
                Get updates on recent acheivement of your connections
              </li>
              <li className="points__item">
                Get the best course at the best prices
              </li>
              <li className="points__item">Grow your community</li>
              <li className="points__item">
                Get your problems solved from the best coders
              </li>
              <li className="points__item">
                Have live interaction with the best in field
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section__3">
        <p className="section__3__title">UP NEXT</p>
        <div className="section__3__inner__wrapper">
          <div className="right__part">
            <ul className="points">
              <li className="points__item">Live personal and group chatting feature</li>
              <li className="points__item">
                Leaderboard and scoring system
              </li>
              <li className="points__item">
                UI/UX improvements
              </li>
            </ul>
          </div>
          <div className="left__part">
            <Lottie options={constructionOptions} height={"100%"} width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
