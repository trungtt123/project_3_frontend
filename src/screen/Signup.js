import { useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoginModal from "../modal/LoginModal";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { connect } from "react-redux";
import BACKEND_URL from "../const/url";

function Login(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['token']);
    const [userName, setUserName] = useState();
    const [fullName, setFullName] = useState();
    const [passWord, setPassWord] = useState();
    const handleSignUp = async () => {

        var response = await axios({
            method: 'post',
            url: `${BACKEND_URL}/api/auth/signup`,
            data: { userName: userName, passWord: passWord, fullName: fullName }
        });
        var status = response.data.result.status;
        // console.log(status);
        if (status === 'OK') {
           
            props.setStatusModal('Đăng ký thành công!', '', 'success')
            navigate(`/login`);
        }
        else props.setStatusModal('Tên đăng nhập đã tồn tại', 'Lỗi!', 'error');
    }
    return (
        <>
            <div className="login_container" style={{ background: `linear-gradient(90deg, #C7C5F4, #776BCC)` }}>
                <div className="login_screen">
                    <div className="login_screen__content">
                        <form className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user" />
                                <input type="text" className="login__input" placeholder="Full name"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-user" />
                                <input type="text" className="login__input" placeholder="User name"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock" />
                                <input type="password" className="login__input" placeholder="Password"
                                    onChange={(e) => setPassWord(e.target.value)}
                                />
                            </div>
                            
                            <div className="button login__submit" onClick={() => handleSignUp()}>
                                <span className="button__text" >SIGN UP NOW</span>
                                <i className="button__icon fas fa-chevron-right" />
                            </div>
                        </form>
                        <div className="social-login">
                            <h3 onClick={() => navigate('/login')}>Login</h3>
                            <div className="social-icons">
                                <div className="social-login__icon fab fa-instagram" />
                                <div className="social-login__icon fab fa-facebook" />
                                <div className="social-login__icon fab fa-twitter" />
                            </div>
                        </div>
                    </div>
                    <div className="login_screen__background">
                        <span className="screen__background__shape screen__background__shape4" />
                        <span className="screen__background__shape screen__background__shape3" />
                        <span className="screen__background__shape screen__background__shape2" />
                        <span className="screen__background__shape screen__background__shape1" />
                    </div>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusModal: (title, description, style) => dispatch({ type: "status_modal", title: title, description: description, style: style })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);