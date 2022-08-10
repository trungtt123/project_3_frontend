import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import MyCamera from "./MyCamera";
export default function Image(props) {

    const [img, setImg] = useState(props?.image_base64 === '' ? undefined : props?.image_base64);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);

    const isShowInput = props?.isShowInput;

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const onImageChange = (e) => {
        const [file] = e.target.files;
        getBase64(file, (result) => {
            setImg(result);
            props.sendImageData(props.index, result);
        });
    };
    const onImageCameraChange = (result) => {
        console.log(result);
        setImg(result);
        props.sendImageData(props.index, result);
    }
    return (

        <>
            {isShowInput ?
                <>
                    <Dialog open={openCamera} fullScreen>

                        <MyCamera handleCloseCamera={() => setOpenCamera(false)} 
                        returnImage={(img) => onImageCameraChange(img)} />

                    </Dialog>
                    <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                        <span className="text-center px-2 py-2" style={{ width: 200, height: 70 }}>
                            <i className="fa fa-camera fa-3x" onClick={() => setOpenCamera(true)}></i>
                            <span style={{ position: 'absolute', bottom: 0, left: 34 }}>Camera</span>

                            <label className="custom-file-upload">
                                <i className="fa fa-file fa-3x ml-5"></i>
                                <input type="file" onChange={(e) => {
                                    onImageChange(e);
                                    setIsOpenDialog(false);
                                }} ></input>
                            </label>

                            <span style={{ position: 'absolute', bottom: 0, right: 28 }}>Chọn file</span>
                        </span>

                    </Dialog>
                    <label className="custom-file-upload" onClick={() => setIsOpenDialog(true)}>
                        <i className="fas fa-image fa-5x" style={{
                            position: 'absolute',
                            marginLeft: window?.innerWidth * 0.2 * 0.5 - 35,
                            marginTop: window?.innerWidth * 0.2 * 0.5 - 35,
                            display: (img === undefined) ? '' : 'none'
                        }}></i>

                        <img className="image-thumbnail-upload" src={img}
                            width={window?.innerWidth * 0.2}
                            height={window?.innerWidth * 0.2} />
                    </label>
                </>
                :
                <>
                    <label className="custom-file-upload">
                        <i className="fas fa-image fa-5x" style={{
                            position: 'absolute',
                            marginLeft: window?.innerWidth * 0.2 * 0.5 - 35,
                            marginTop: window?.innerWidth * 0.2 * 0.5 - 35,
                            display: (img === undefined) ? '' : 'none'
                        }}></i>

                        <img className="image-thumbnail-upload" src={img}
                            width={window?.innerWidth * 0.2}
                            height={window?.innerWidth * 0.2} />
                    </label>
                </>
            }
        </>

    )
}