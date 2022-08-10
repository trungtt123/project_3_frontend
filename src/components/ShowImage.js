import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export default function ShowImage(props) {
    const [open, setOpen] = React.useState(props?.open);
    return (
        <Dialog
            onClose={() => {
                setOpen(false);
                props.onClose();
            }}
            open={open}
            fullWidth
            maxWidth="md"
        >
            {props?.image_base64 === "" ? <div className='text-center'>Không có hình ảnh!</div> : <img src={props?.image_base64} />}
            
        </Dialog>


    );
}
