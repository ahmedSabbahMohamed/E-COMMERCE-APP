import React, { useEffect, useState } from "react";
import { Image, Upload } from "antd";
import UploadButton from "../ui/UploadButton";
import { useFormikContext } from "formik";

const FileHandler = ({
  maxFiles,
  label,
  id,
  fileTypes = [".jpeg", ".png", ".jpg", ".svg"],
  currentFiles = [],
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (currentFiles.length > 0) {
      const initialFileList = currentFiles.map((file, index) => {
        console.log("file => ", file);
        if (file?.path) {
          return {
            uid: `${index}`,
            name: file?.path,
            status: "done",
            url: file?.path,
            originFileObj: file,
          };
        } else {
          return {
            uid: `${index}`,
            name: file?.name,
            originFileObj: file,
          };
        }
      });
      setFileList(initialFileList);
    }
  }, [currentFiles]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (maxFiles === 1) {
      setFieldValue(id, newFileList[0]?.originFileObj);
    } else {
      const images = newFileList.map((file) => file?.originFileObj || file);
      setFieldValue(id, images);
    }
  };

  return (
    <div className="p-2 rounded border">
      <label className="mb-2" htmlFor={id}>
        {label}
      </label>
      <Upload
        id={id}
        accept={fileTypes}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={maxFiles > 1}
        maxCount={maxFiles}
        action={null}
        beforeUpload={() => false}
      >
        {fileList.length >= maxFiles ? null : <UploadButton />}
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
export default FileHandler;
