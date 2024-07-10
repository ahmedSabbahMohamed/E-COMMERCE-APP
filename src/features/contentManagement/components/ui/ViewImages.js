import React from "react";

function ViewImages({ imgs = [] }) {
  return (
    <div className="d-flex flex-row flex-wrap gap-2 align-items-center justify-content-center">
      {imgs?.map((img, index) => (
        <div
          key={index}
          style={{ width: "10rem", height: "10rem" }}
          className="rounded overflow-hidden"
        >
          <img className="w-100 h-100" src={img?.path} alt={img.id} />
        </div>
      ))}
    </div>
  );
}

export default ViewImages;
