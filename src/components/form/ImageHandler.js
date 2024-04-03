// import { useFormikContext } from "formik";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import "../../assets/styles/ImageHandler.css";
// import { Case, Default, Switch } from "react-if";
// import { useLocation, useParams } from "react-router-dom";

// function ImageHandler({ name, label, multiple = true }) {
//   const { values, setFieldValue, touched, errors, handleBlur } = useFormikContext();
//   const location = useLocation()
//   const {categoryId} = useParams()

//   const handleChange = (e) => {
//         if (multiple) {
//           const files = values[name] || []
//           setFieldValue(name, [...files, ...e.target.files]);
//         } else {
//           setFieldValue(name, e.target.files[0]);
//         }
//   };

//   const handleDelete = (index) => {
//         if (multiple) {
//           const files = [...values[name]];
//           files.splice(index, 1);
//           setFieldValue(name, files);
//         } else {
//           setFieldValue(name, null);
//         }
//   };

//   const file = values && values[name] ? values[name] : values;

//   let imageUrl = null;
//   if (file instanceof File) {
//     imageUrl = URL.createObjectURL(file);
//   }

//   const hasError = touched[name] && errors[name];

//   return (
//     <div className="border rounded p-3">
//       <label
//         htmlFor={name}
//         className={`d-block ${hasError ? "text-danger" : ""}`}
//       >
//         {hasError ? errors[name] : label}
//       </label>
//       <input
//         type="file"
//         multiple={multiple}
//         id={name}
//         name={name}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         className="d-none"
//       />
//       <Switch>
//         <Default>
//           <label
//             className="btn btn-primary rounded-circle fw-bolder shadow"
//             htmlFor={name}
//           >
//             +
//           </label>
//         </Default>
//       </Switch>

//       <div className="d-flex align-items-center gap-3 flex-row flex-wrap mt-2">
//         {multiple && (
//           <>
//             {values[name] &&
//               values[name].map((file, index) => (
//                 <div
//                   key={index}
//                   className="image shadow my-3 rounded position-relative"
//                 >
//                   <img className="rounded" src={URL.createObjectURL(file)} />
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="btn btn-sm btn-danger position-absolute"
//                   >
//                     <RiDeleteBin6Line />
//                   </button>
//                 </div>
//               ))}
//           </>
//         )}
//         {!multiple && (
//           <div className="image shadow my-3 rounded position-relative">
//             <img className="rounded" src={imageUrl ?? values?.picture} />
//             <button
//               onClick={() => handleDelete()}
//               className="btn btn-sm btn-danger position-absolute"
//             >
//               <RiDeleteBin6Line />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageHandler;

import React, { useState } from "react";
import { Image, Upload } from "antd";
import UploadButton from "../ui/UploadButton";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageHandler = ({ numOfImgs = 1, label, name, onImageChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }

  console.log(fileList)

  return (
    <div className="p-2 rounded border">
      <label className="d-block mb-2" htmlFor={name}>
        {label}
      </label>
      <Upload
        accept="image/*"
        name={name}
        id={name}
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