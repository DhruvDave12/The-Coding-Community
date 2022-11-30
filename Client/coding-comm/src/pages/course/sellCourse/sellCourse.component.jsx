import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./sellCourse.styles.scss";
import sellImage from "../../../assets/images/sell.svg";
import FileInput from "../../../components/file-input/file-input.component";
import CustomCourseButton from "../../../components/button/customCourseButton.component";
import LazyLoader from "../../../components/lazy-loader/lazy-loader.component";
import { Input } from "antd";
const { TextArea } = Input;

const SellCourse = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [price, setPrice] = useState(0);
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [overview, setOverview] = useState([]);
  const [addFields, setAddFields] = useState([]);
  const [currOverview, setCurrOverview] = useState("");
  const [handleSubLoading, setHandleSubLoading] = useState(false);

  // on click generate a new field and then push its value in overview array
  const addField = () => {
    setAddFields([...addFields, ""]);
    setCurrOverview("");
    // setOverview([...overview, "Enter data"]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setHandleSubLoading(true);
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("image", file[i].originFileObj);
    }
    console.log("DESC: ", description);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("overview", overview);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    };
    try{
      await axios.post("http://localhost:8080/course/new", formData, config);
      setHandleSubLoading(false);
      navigate("/course");
      window.location.reload(false);
    } catch (err) {
      setHandleSubLoading(false);
      console.log(err);
    }
  };

  return (
    !handleSubLoading ?
    <div className="sell__course">
      <div className="sell__course__upper">
        <div className="sell__course__upper__container__left">
          <div>
            <p className="sell__course__landing__title">
              Sell your courses at the best market deal possible
            </p>
            <p className="sell__course__tagline">
              Fill the form below and complete the payment. Note that charges
              are INR 1000 /- per course
            </p>
          </div>
        </div>
        <div className="sell__course__upper__container__right">
          <img src={sellImage} alt="sell-image" className="landing__image" />
        </div>
      </div>
      <div className="sell__course__form">
        <p className="form__heading">Fill the below form and start earning.</p>
        <form onSubmit={handleSubmit}>
          <div className="input__field">
            <p className="label">Title</p>
            <Input
              placeholder="Enter a title for your course"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input__field">
            <p className="label">Language</p>
            <Input
              placeholder="Enter the language for your course"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="input__field">
            <p className="label">Price</p>
            <Input
              placeholder="Enter the price for your course"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="input__field">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                columnGap: "4%",
              }}
            >
              <p className="label">Set overview</p>
              <div style={{ width: "10%" }}>
                <CustomCourseButton title={"Add Overview"} onClick={addField} />
              </div>
            </div>
            {addFields.length > 0 && (
              <div>
                {addFields.map((item, index) => {
                  return (
                    <div key={index} style={{marginBottom: '2%', display:'flex', columnGap: '4%'}}>
                      <Input
                        placeholder="Enter the overview for your course"
                        onChange={(e) =>
                          setCurrOverview(e.target.value)
                        }
                      />
                      <div style={{width: '20%'}}>
                        <CustomCourseButton title={'Confirm'} onClick={() => {
                            setOverview([...overview, currOverview]);                        
                        }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="input__field">
            <p className="label">Description</p>
            <TextArea
              rows={4}
              placeholder="Enter a suitable description for your course..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input__field">
            <p
              className="label"
              style={{ color: "#a4508b", fontWeight: "700" }}
            >
              Make sure the first item you select is thumbnail and rest are
              videos
            </p>
            <FileInput
              loading={loading}
              setLoading={setLoading}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setFile={setFile}
              multiple={true}
            />
          </div>

          <div className="custom__button">
            <CustomCourseButton title={"Submit"} onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div> : 
    <LazyLoader text={"Please wait while we are uploading the course :)"}/>
  );
};

export default SellCourse;
