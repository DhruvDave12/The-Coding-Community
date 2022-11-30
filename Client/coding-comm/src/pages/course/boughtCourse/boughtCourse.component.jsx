import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./boughtCourse.styles.scss";
import { useSearchParams } from "react-router-dom";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import VideoPlayer from "../../../components/video-player/video-player.component";
import { Collapse } from "antd";

const { Panel } = Collapse;

const BoughtCourse = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const hashKey = searchParams.get("key");
  const [hasBought, setHasBought] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const course = location.state;
  useEffect(() => {
    const securelyCheck = async () => {
      setLoading(true);
      const res = await axios.post(
        "https://the-coding-community.herokuapp.com/course/check",
        {
          key: hashKey,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setHasBought(res.data.data);
      setActiveVideo(course.videos[1]);
      setLoading(false);
    };

    securelyCheck();
  }, []);

  //   console.log("COURSE", course);
  const onChange = (val) => {
    // console.log("VAL: ",val);
    setActiveVideo(course.videos[parseInt(val[val.length - 1])]);
  };

  return !loading ? (
    <div className="bought__course">
      {hasBought ? (
        // <iframe src={course.videos[1].url}></iframe>
        <div className="bought__inner__wrapper">
          <div className="video__wrapper">
            <VideoPlayer videoURL={activeVideo.url} />
          </div>
          <div className="video__list">
            {/* {course.videos
              .filter((video, index) => index > 0)
              .map((video, index) => (
                <div
                  className="video__item"
                  key={index}
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="video__item__inner">
                    <div className="video__item__thumbnail">
                      <img src={video.thumbnail} alt="video thumbnail" />
                    </div>
                  </div>
                </div>
              ))} */}
            <Collapse defaultActiveKey={[0]} onChange={onChange}>
                {
                    course.videos.filter((video,index) => index > 0).map((video,index) => (
                            <Panel header={`Lesson ${index+1}`} key={index}>
                                <p>Here we can put the resources</p>
                            </Panel>
                    ))
                }
            </Collapse>
          </div>
        </div>
      ) : (
        <h1>You dont have the access to this course.</h1>
      )}
    </div>
  ) : (
    <LazyLoader />
  );
};

export default BoughtCourse;
