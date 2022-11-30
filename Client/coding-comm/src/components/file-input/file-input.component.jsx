import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const FileInput = ({ loading, setLoading, imageUrl, setImageUrl, setFile, multiple}) => {
  const handleChange = (info) => {
    console.log("INFO FILE: ", info.file);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    if(!multiple){
      setFile(info.file.originFileObj);
    } else {
      setFile(info.fileList);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: 'image',
    multiple: true,
    customRequest: dummyRequest,
    onChange: handleChange,
  };
  return (
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined style={{fontSize: '450%'}}/>
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Upload as many files as you want in this draggable area.
    </p>
  </Dragger>
  );
};

export default FileInput;
