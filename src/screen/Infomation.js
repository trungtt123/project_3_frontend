import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import BACKEND_URL from '../const/url';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


function Home(props) {
    let navigate = useNavigate();
    const { listGroups, userData } = props;
    const [dataPost, setDataPost] = useState([]);
    const [_userData, setUserData] = useCookies(['userData']);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [loading, setLoading] = useState(true);
    const [myGroup, setMyGroup] = useState(0);
    const [fullName, setFullName] = useState();

    const [oldPassWord, setOldPassWord] = useState('');
    const [newPassWord, setNewPassWord] = useState('');
    const [confirmNewPassWord, setConfirmNewPassWord] = useState('');


    const [option, setOption] = useState(0);


    const handleChange = (event) => {
        setMyGroup(event.target.value);
    };
    const handleChangeInfomation = async () => {
        var data = {
            userName: props?.userData.userName,
            fullName: fullName,
            group: myGroup + 1
        }
        var response = axios({
            method: 'post',
            url: `${BACKEND_URL}/api/user/change-infomation`,
            data: data
        }).then(async (response) => {
            var user = response?.data?.result;
            await props.setUserData(user?.token, user?.userName, user?.fullName, user?.group);
            setUserData('userData', user, { path: '/' });
            props.setStatusModal('Chỉnh sửa thành công', '', 'info');
        }).catch(error => {
            console.log(error);
        });
    }
    const handleChangePassword = async () => {
        if (newPassWord !== confirmNewPassWord) {
            props.setStatusModal('Confirm password không chính xác!', '', 'error');
            return;
        }
        var data = {
            userName: props?.userData.userName,
            oldPassWord: oldPassWord,
            newPassWord: newPassWord
        }
        axios({
            method: 'post',
            url: `${BACKEND_URL}/api/user/change-password`,
            data: data
        }).then(response => {
            var kt = response?.data?.result;
            if (!kt) props.setStatusModal('Password không chính xác!', '', 'error');
            else {
                props.setStatusModal('Đổi mật khẩu thành công!', '', 'info');
                removeCookie('token', '/');
                removeCookie('userData', '/');
                window.location.reload();

            }
        }).catch(error => {
            console.log(error);
        });


    }
    useEffect(() => {
        setFullName(userData.fullName);
        setMyGroup(userData.group - 1);
    }, []);
    // console.log(props.userData)
    return (
        <>
            <div>
                <i className="fa-solid fa-chevron-left"
                    onClick={() => navigate(-1)}
                    style={{ position: 'absolute', left: 10, top: 15 }}></i>
            </div>

            <h3 className="text-center mt-2">
                <b>Chỉnh sửa thông tin</b>
            </h3>
            <h3 className="d-flex justify-content-center mt-3">

                <div className="">

                    <img src="https://demoda.vn/wp-content/uploads/2022/01/anh-shin-cau-be-but-chi.jpg"
                        style={{
                            borderRadius: '50%', border: 'solid 4px black', width: '200px', height: '200px',
                            imageRendering: 'pixelated'
                        }} />
                </div>

            </h3>

            <div style={{ width: '97%', margin: 'auto' }} className="mt-4">
                <Box sx={{ minWidth: 120 }} className="mb-4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Option</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option}
                            label="Option"
                            onChange={(e) => setOption(e.target.value)}
                        >
                            <MenuItem value={0}>Thay đổi thông tin cá nhân</MenuItem>
                            <MenuItem value={1}>Thay đổi mật khẩu</MenuItem>
                           
                        </Select>
                    </FormControl>
                </Box>
                {option === 0 ? <div>
                    <TextField fullWidth id="outlined-basic" label="Full name" onChange={(e) => setFullName(e.target.value)}
                        defaultValue={props?.userData?.fullName} variant="outlined" />
                    <FormControl fullWidth className="mt-4">
                        <InputLabel id="demo-simple-select-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={myGroup}
                            label="Group"
                            onChange={handleChange}
                        >
                            {
                                listGroups.map((item, index) => {
                                    return <MenuItem key={index} value={index}>{item.groupName}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <button onClick={() => handleChangeInfomation()}
                        className="btn btn-info mt-2 float-right"><b>Lưu</b></button>
                </div>
                : <div>
                    <div style={{ width: '97%', margin: 'auto' }} className="mt-4">
                <TextField fullWidth id="outlined-basic" label="Old password" onChange={(e) => setOldPassWord(e.target.value)}
                     variant="outlined" type="password"/>
                <TextField className="mt-3" fullWidth label="New password" onChange={(e) => setNewPassWord(e.target.value)}
                     variant="outlined" type="password" />
                <TextField fullWidth className="mt-3" label="Confirm new password" onChange={(e) => setConfirmNewPassWord(e.target.value)}
                     variant="outlined" type="password" />
                <button onClick={() => handleChangePassword()}
                    className="btn btn-info mt-4 float-right"><b>Lưu</b></button>
            </div>
                </div>
                        }
            </div>

            {/* {groups?.length === 0 && !loading
                ?
                <>
                    <div className="text-center mt-3">
                        Không có nhóm nào!
                    </div>
                </>

                :

                groups.map((item, index) => {
                    return <Card className="mb-3" key={index} onClick={() => navigate(`/group/${item?._id}`, {
                        state: item
                    })}>
                        <CardHeader
                            avatar={
                                <Avatar >
                                    G
                                </Avatar>
                            }
                            title={<b>{item?.groupName}</b>}
                        />
                    </Card>

                })


            }
 */}

        </>

    )
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setStatusModal: (title, description, style) => dispatch({ type: "status_modal", title: title, description: description, style: style }),
    setUserData: (token, userName, fullName, group) => dispatch({ type: "userData", userName: userName, fullName: fullName, token: token, group: group })
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);