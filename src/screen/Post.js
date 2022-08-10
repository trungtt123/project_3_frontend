import MyCard from "../components/MyCard"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import BACKEND_URL from '../const/url';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MyPopup from '../components/MyPopup';
import { connect } from "react-redux";
import Image from '../components/Image';
import Loading from "../components/Loading";
import moment from "moment";
import ShowImage from "../components/ShowImage";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post(props) {
    const { state } = useLocation();
    const [postData, setPostData] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        console.log('run');
        const getPost = async () => {
            var res = await axios({
                method: 'post',
                url: `${BACKEND_URL}/api/post/getpost`,
                data: { userName: state?.post?.userName, postID: state?.post?._id }
            });
            if (res?.data?.success === true) {
                setPostData(res?.data?.result);
                setLoading(false);
            }
        }
        getPost();
    }, []);
    return <>

        { selectedImage !== undefined ? 
        <ShowImage open={true} image_base64={selectedImage} onClose={() => setSelectedImage(undefined)}/> : <></>}
        <Card style={{ border: "none", boxShadow: "none" }}>
            <div>
                <i className="fa-solid fa-chevron-left"
                    onClick={() => navigate(-1)}
                    style={{ marginLeft: 10, marginTop: 15 }}></i>
            </div>

            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src='https://demoda.vn/wp-content/uploads/2022/01/anh-shin-cau-be-but-chi.jpg'>

                    </Avatar>
                }
                action={

                    <MyPopup postData={postData} group={state?.group}/>
                }
                title={postData?.fullName}
                subheader={moment(postData?.updatedAt).format('MM/DD/YYYY, h:mm:ss A')}
            />
            <div className="text-center mt-3">
                <span style={{ display: loading ? '' : 'none' }}>
                    <i className="fas fa-spinner fa-spin mr-3"></i>
                    Đang tải bài viết . . .
                </span>

            </div>
            <CardContent>
                <Typography variant="body1" color="text.primary" style={{
                    wordWrap: "break-word"
                }} >
                    {postData?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{
                    wordWrap: "break-word"
                }}>
                    {postData?.description}
                </Typography>
            </CardContent>

            <div className="row ml-1 mr-1 mt-3" >
                {postData?.images?.map((item, index) => {
                    return <div className="col-3 d-flex justify-content-center" key={index} onClick={() => setSelectedImage(item?.image_base64)}>
                        <Image key={index} image_base64={item.image_base64} isShowInput={false}
                            index={index} />
                    </div>
                })}
            </div>

        </Card>
        {/* <MyCard postData={postData} /> */}
    </>
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Post);