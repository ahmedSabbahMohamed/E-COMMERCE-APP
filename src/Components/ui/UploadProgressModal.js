import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideUploadProgress } from "../../Api/store/uploadSlice";
import { Progress } from "antd";

const UploadProgressModal = () => {
  const dispatch = useDispatch();
  const { show, progress } = useSelector((state) => state.uploadSlice);

  useEffect(() => {
    if (progress === 100) {
      dispatch(hideUploadProgress());
    }
  }, [progress, dispatch]);

  return (
    show && (
      <div
        className="position-fixed bg-white rounded shadow px-4 py-2"
        style={{ top: "2rem", right: "2rem", zIndex: "999999" }}
      >
        <h3>Uploading Files...</h3>
        <Progress status="active" percent={progress} />
      </div>
    )
  );
};

export default UploadProgressModal;
