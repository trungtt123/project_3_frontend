import { useEffect, useState, useRef } from "react";
import { Camera } from "react-camera-pro";

export default function MyCamera(props) {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(undefined);
  const [openCamera, setOpenCamera] = useState(true);

  return (
    <div>

      {openCamera ? <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras}
        style={{ zIndex: 1 }} /> : undefined}

      <img hidden={image === undefined} src={image} width={window?.innerWidth}
        height={window?.innerHeight} />
      <div className="btnControll" style={{
        zIndex: 10,
        position: 'fixed',
        bottom: 0, left: 0
      }}>
        <div hidden={image !== undefined} className="btnControl1 d-flex justify-content-center" style={{ width: window?.innerWidth }}>
          <button
            className="btn btn-info"
            onClick={() => {
              const photo = camera.current.takePhoto();
              setImage(photo);
              setOpenCamera(false);
            }}
          >Chụp</button>
          <button
            className="btn btn-warning ml-1"
            disabled={numberOfCameras <= 1}
            onClick={() => {
              camera.current.switchCamera();
            }}
          >Đổi camera</button>
          <button
            className="btn btn-danger ml-1"
            onClick={() => {
              props.handleCloseCamera()
            }}
          >Hủy</button>
        </div>
        <div hidden={image === undefined} className="btnControl2 d-flex justify-content-center" style={{ width: window?.innerWidth }}>
          <button
            className="btn btn-success"
            onClick={() => {
              props.returnImage(image);
              props.handleCloseCamera()
            }}
          >Chọn</button>
          <button
            className="btn btn-warning ml-1"
            onClick={() => {
              setImage(undefined);
              setOpenCamera(true);
            }}
          >Chụp lại</button>
          <button
            className="btn btn-danger ml-1"
            onClick={() => {
              props.handleCloseCamera()
            }}
          >Hủy</button>
        </div>


      </div>

    </div>
  )
}