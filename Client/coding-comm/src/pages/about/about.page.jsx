import React from "react";
import "./about.styles.scss";
import developerImage from "../../assets/images/developer__image.jpg";
import githubImage from "../../assets/images/github.svg";
import linkedinImage from "../../assets/images/linkedin.svg";
import leetcodeImage from "../../assets/images/leetcode.svg";

const About = () => {
    return (
        <div className="about">
            <div className="about__wrapper">
                <p className="about__header">About The Coding Community</p>
                <p className="about__coding__community">
                    Coding Community is a platform for developers to share their
                    knowledge and learn from each other. Here you can find the best
                    articles, tutorials, and videos on web development, programming,
                    and more. Interact with other programmers and developers and upgrade yourself everyday.
                    We offer the best in community courses at the most reasonable rate in the market.
                    We have integrated many different important platforms at single place, here you can get your doubts and queries solved.
                    Show your skills and develop a good profile of yours. Get to know about other peoples achievements, and get inspired.
                    The Coding Community is a one stop place for every programmer.
                    So what are you waiting for? Join us now!
                </p>

                <div className="developed__by">
                    <p className="developed__by__text"> 
                        Developed by
                    </p>
                    <div className="dev__wrapper">
                        <div className="image__wrapper"> 
                            <img src={developerImage} alt="developer__image" className="developer__image"/>
                        </div>
                        <p className="developer__bio">
                            Hey, I am Dhruv Dave a Full Stack Developer currently in my pre final year of B.Tech in Computer Science and Engineering from Indian Institute of Information Technology, Vadodara.
                            I specialize in MERN Stack. I have experience with React, Node, Express, MongoDB, NextJS, React Native and many more. I am currently exploring Blockchain and the world of Web3. 
                            I have won the Smart India Hackathon 2022 and bagged the first prize in this nationwide biggest innovative hackathon organized by the government of India. I am currently working on 
                            Web3 projects. I also have good knowledge of Data Structures and Algorithm. I hope you like my work. You can contact me on my social media handles.
                        </p>
                    </div>
                    <div className="social__wrapper">
                        <div className="social__handles">
                            <a href="https://linkedin.com/in/dhruv1201/" target="_blank" rel="noreferrer">
                                <img src={linkedinImage} alt="linkedin" className="social__icon" />
                            </a>
                            <a href="https://github.com/DhruvDave12">
                                <img src={githubImage} alt="github" className="social__icon" />
                            </a>
                            <a href="https://leetcode.com/Dhruv_D">
                                <img src={leetcodeImage} alt="leetcode" className="social__icon"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;