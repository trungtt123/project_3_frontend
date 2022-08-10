import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../const/url';
import Loading from './Loading';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function MyPopup(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle style={{ textAlign: 'center', fontSize: 18 }}>Thao tác</DialogTitle>

            <ListItem onClick={() => {
                props.value('edit');
                handleClose();
            }}
            >

                <EditIcon style={{ marginRight: 10 }} />

                <ListItemText primary={'Chỉnh sửa bài viết'} />
            </ListItem>
            <ListItem onClick={() => {
                props.value('remove');
                handleClose();
            }}>

                <DeleteIcon style={{ marginRight: 10 }} />

                <ListItemText primary={'Xóa bài viết'} />
            </ListItem>

        </Dialog>
    );
}

MyPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogDemo(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [loading, setLoading] = React.useState(false);

    var navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const handleActionPopup = async (action) => {
        switch (action) {
            case 'remove': {
                // console.log(props);
                setLoading(true);
                var res = await axios({
                    method: 'post',
                    url: `${BACKEND_URL}/api/post/removepost`,
                    data: {
                        token: props?.userData?.token,
                        postID: props?.postData?._id
                    }
                });
                // console.log(res);
                setLoading(false);
                props.setStatusModal('Xóa bài viết thành công!', '', 'success');
                setTimeout(() => {
                    navigate(-1)
                }, 2000)
                break;
            }
            case 'edit': {
                navigate(`/group/${props?.group?._id}/edit/${props.postData._id}`, {
                    state: {
                        postData: props.postData,
                        group: props.group
                    }
                })
                break;
            }
        }

    }
    return (
        <div>
            <Loading open={loading} />
            {
                props?.postData?.userName === props?.userData?.userName && props?.postData?.userName !== undefined
                    ? <MoreVertIcon onClick={handleClickOpen} /> : <></>
            }
            <MyPopup
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                value={(action) => handleActionPopup(action)}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusModal: (title, description, style) => dispatch({ type: "status_modal", title: title, description: description, style: style })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleDialogDemo);