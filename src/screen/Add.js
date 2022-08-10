import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import "antd/dist/antd.css";
import { Row, Col, Divider, ConfigProvider } from 'antd';
import Image from '../components/Image';
import BACKEND_URL from '../const/url';
import { connect } from "react-redux";
import Loading from '../components/Loading';
class MyImage {
  constructor(index, image_base64) {
    this.index = index;
    this.image_base64 = image_base64;
  }
}
class MyText {
  constructor(description, type) {
    this.description = description;
    this.type = type;
  }
}
function Add(props) {
  const [content, setContent] = useState();
  const [elmDataImage, setElmDataImage] = useState();
  const [dataImage, setDataImage] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { userData, listGroups } = props;
  const group = listGroups[userData.group - 1]; 
  
  const sendImageData = (index, image_base64) => {
    //console.log(index, image_base64);
    var items = [...dataImage];
    items[index].image_base64 = image_base64;
    setDataImage(items);
  }
  const addImage = (count) => {
    var arr = [...dataImage];
    for (var i = 1; i <= count; i++) {
      var newImage = new MyImage(arr.length, '');
      arr.push(newImage);
    }

    setDataImage(arr);
  }
  const handleSubmit = async () => {
    setLoading(true);
    console.log(dataImage)
    var response = await axios({
      method: 'post',
      url: `${BACKEND_URL}/api/post/createpost`,
      data: {
        token: props?.userData?.token,
        title: title,
        description: description,
        images: dataImage,
        groupId: group._id
      }
    });
    if (response?.data?.success === true) {
      setLoading(true);
      props.setStatusModal('Tạo bài viết thành công!', '', 'success');
      navigate(-1);
    }
    else {
      setLoading(false);
      props.setStatusModal('Tạo bài viết thất bại!', '', 'error');

    }
  }
  console.log('re-render');
  let navigate = useNavigate();
  return (
    <>
      <Loading open={loading}/>
      <div>
        <i className="fa-solid fa-chevron-left"
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', left: 10, top: 15 }}></i>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <h4><b>Tạo bài viết</b></h4>
      </div>
      <div className="form-group ml-1 mr-1">
        <label className="ml-2">Thêm tiêu đề</label>
        <input type="email" className="form-control"
          id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập tiêu đề ..."
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>
      <div className="form-group ml-1 mr-1">
        <label className="ml-2">Thêm mô tả</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
          placeholder="Nhập mô tả ..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group ml-1">
        <label className="ml-2">Thêm ảnh</label>
        <div className="btn btn-info ml-2 btn-sm" onClick={() => addImage(1)}>+1</div>
        <div className="btn btn-info ml-2 btn-sm" onClick={() => addImage(10)}>+10</div>
        <div className="btn btn-info ml-2 btn-sm" onClick={() => addImage(20)}>+20</div>
        <div className="btn btn-info ml-2 btn-sm" onClick={() => addImage(50)}>+50</div>
        <div className="btn btn-info ml-2 btn-sm" onClick={() => addImage(100)}>+100</div>
        <div className="d-flex justify-content-center mt-2">Có {dataImage.length} ảnh</div>
        <div className="row ml-1 mr-1 mt-3" >
          {dataImage.map((item, index) => {
            return <div className="col-3 d-flex justify-content-center" key={index}>
              <Image key={index} image_base64={item.image_base64} isShowInput={true}
                index={index} sendImageData={(index, image_base64) => sendImageData(index, image_base64)} />
            </div>
          })}

        </div>

      </div>
      <div className="d-flex justify-content-center"

        onClick={() => handleSubmit()}>
        <button className="btn btn-success mb-3">
          <b>Đăng bài viết</b>
        </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Add);