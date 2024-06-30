import React from "react";
import { Progress } from "antd";

function ProgressBar({ percent }) {
  return (
    <div
      className="w-100 h-100 position-fixed start-0 top-0 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(213, 213, 255, 0.5)",
        zIndex: "9999",
      }}
    >
      <Progress type="circle" percent={percent} />
    </div>
  );
}

export default ProgressBar;
