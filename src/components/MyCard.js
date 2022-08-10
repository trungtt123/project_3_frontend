import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MyPopup from './MyPopup';
import { connect } from "react-redux";
import Image from '../components/Image';
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

function MyCard(props) {

  // console.log(props?.postData)
  return (
    <Card sx={{}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src='https://demoda.vn/wp-content/uploads/2022/01/anh-shin-cau-be-but-chi.jpg'>

          </Avatar>
        }
        action={

          <MyPopup postData={props?.postData} token={props?.token} />
        }
        title="Trần Quang Trung"
        subheader="April 25, 2022"
      />

      <CardContent>
        <Typography variant="body1" color="text.primary" style={{
          wordWrap: "break-word"
        }} >
          {props?.postData?.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{
          wordWrap: "break-word"
        }}>
          {props?.postData?.description}
        </Typography>
      </CardContent>
      <div className="row ml-1 mr-1 mt-3" >
        {props?.postData?.images.map((item, index) => {
          return <div className="col-3 d-flex justify-content-center" key={index}>
            <Image key={index} image_base64={item.image_base64} isShowInput={false}
              index={index} />
          </div>
        })}
      </div>

    </Card>
  );
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(MyCard);