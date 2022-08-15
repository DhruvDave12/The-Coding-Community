import React, {useState} from "react";
import "./newPostModal.styles.scss";
import FileInput from "../file-input/file-input.component";
import TextInput from "../text-input/text-input.component";

const NewPostModal = ({setCaption, setFile}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
  return (
    <div className="new__post__modal">  
        <div>
            <label htmlFor="caption" className="input__label">Enter a suitable Caption</label>
            <TextInput placeholder={"Caption"} setChange={setCaption} type={"text"}/>
        </div>
        <div className="new__post__image">
            <FileInput setFile={setFile} loading={loading} setLoading={setLoading} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
        </div>
    </div>
  );
};

export default NewPostModal;
