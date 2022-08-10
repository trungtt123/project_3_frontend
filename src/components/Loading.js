import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export default function Loading(props) {
    return (
        <div>
            <Dialog
                open={props?.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                
                <span className="text-center px-2 py-2" style={{width: 200, height: 60}}>
                    <i className="fas fa-spinner fa-spin fa-3x"></i> 
                    <span className="ml-2"  style={{fontSize: 20, fontWeight: 'bold'}}>Đang xử lý . . . </span>
                </span>
            </Dialog>
        </div>
    );
}
