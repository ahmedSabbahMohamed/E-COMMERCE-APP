import { PhotoView } from "react-photo-view";

function ImageViewer({ imgs, width = "7rem", height = "7rem" }) {
  return (
    <div className="d-flex gap-2 align-items-center justify-content-center my-1">
      {imgs?.map((img, index) => (
          <PhotoView src={img?.path}>
            <img className="rounded" style={{ width: width, height: height, cursor: "pointer" }} src={img?.path} alt={index} />
          </PhotoView>
      ))}
    </div>
  );
}

export default ImageViewer;
