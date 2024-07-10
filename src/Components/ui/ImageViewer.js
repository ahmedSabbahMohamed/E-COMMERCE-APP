import { PhotoView } from "react-photo-view";

function ImageViewer({ imgs }) {
  return (
    <div className="d-flex gap-2 align-items-center justify-content-center">
      {imgs?.map((img, index) => (
          <PhotoView src={img?.path}>
            <img className="rounded" style={{ width: "7rem", height: "7rem", cursor: "pointer" }} src={img?.path} alt={index} />
          </PhotoView>
      ))}
    </div>
  );
}

export default ImageViewer;
