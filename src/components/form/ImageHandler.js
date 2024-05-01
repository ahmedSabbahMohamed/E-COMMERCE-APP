import React, { useState } from "react";
import { Image, Upload } from "antd";
import UploadButton from "../ui/UploadButton";
import { useFormikContext } from "formik";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageHandler = ({ numOfImgs, name, label }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { setFieldValue, values } = useFormikContext()

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (numOfImgs === 1) {
      setFieldValue(name, newFileList[0]?.originFileObj);
    } else {
        const images = newFileList.map((file) => file.originFileObj);
        setFieldValue(name, images);
      }
    }

  return (
    <div className="p-2 rounded border">
      <label className="mb-2" htmlFor={name}>
        {label}
      </label>
      <Upload
        id={name}
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={numOfImgs !==  1}
        maxCount={numOfImgs}

      >
        {fileList.length >= numOfImgs ? null : <UploadButton />}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};
export default ImageHandler;