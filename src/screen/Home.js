import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import BACKEND_URL from '../const/url';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { CardActions, Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import moment from 'moment'

import SearchBar from "material-ui-search-bar";

function Home(props) {
  const { listGroups, userData } = props;
  let navigate = useNavigate();
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [group, setGroup] = useState(state);

  const [nameFilter, setNameFilter] = useState(false);
  const [contentFilter, setContentFilter] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    console.log(searchValue);
    var tmp =  dataPost.filter(o => o.fullName.includes(searchValue) || o.title.includes(searchValue) || o.description.includes(searchValue));
    
    if (nameFilter && !contentFilter){
      tmp = dataPost.filter(o => o.fullName.includes(searchValue));
    }
    if (!nameFilter && contentFilter){
      tmp = dataPost.filter(o => o.title.includes(searchValue) && o.description.includes(searchValue));
    }
    setPosts(tmp);
  }
  useEffect(() => {

    setLoading(true);
    if (listGroups == null) return;
    var userGroup = listGroups[userData.group - 1];
    if (userGroup !== undefined)
      axios({
        method: 'get',
        url: `${BACKEND_URL}/api/group/${userGroup?._id}`,
      }).then(response => {
        setDataPost(response?.data?.result);
        setPosts(response?.data?.result);
        setLoading(false);
      });

  }, [listGroups]);

  return (

    <>
      <div>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '92%', margin: 'auto', mt: 1 }}
        >
          <InputBase
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search . . ."
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => handleSearch()}>
            <SearchIcon />
          </IconButton>

        </Paper>
      </div>
      <div>
        <div className="ml-4 mt-2">Bộ lọc: </div>
        <div className="d-flex justify-content-center">
          <div><Checkbox size="small" onClick={() => setNameFilter(!nameFilter)}
            checked={nameFilter} />Tên người đăng</div>
          <div className="ml-5"><Checkbox onClick={() => setContentFilter(!contentFilter)}
            size="small" checked={contentFilter} />Nội dung</div>
        </div>

      </div>

      <div className="text-center mt-3">
        <span style={{ display: loading ? '' : 'none' }}>
          <i className="fas fa-spinner fa-spin mr-3"></i>
          Đang tải bài viết . . .
        </span>

      </div>
      {posts?.length === 0 && !loading
        ?
        <>
          <div className="text-center mt-3">
            Không có bài viết nào!
          </div>
        </>

        :

        posts.map((item, index) => {
          return <Card className="mb-3" key={index} >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src='https://demoda.vn/wp-content/uploads/2022/01/anh-shin-cau-be-but-chi.jpg'>

                </Avatar>
              }
              action={

                <></>
                // <MyPopup postData={postData} token={props?.token.token} />
              }
              title={item?.fullName}
              subheader={moment(item.updatedAt).format('MM/DD/YYYY, h:mm:ss A')}
            />

            <CardContent>
              <Typography variant="body1" color="text.primary" style={{
                wordWrap: "break-word"
              }} >
                {item?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{
                wordWrap: "break-word"
              }}>
                {item?.description.slice(0, 100) + ' ...'}
              </Typography>

              <div style={{ position: 'absolute', right: 10 }}>
                <Button size="small" style={{ color: '#1434A4' }}
                  onClick={() => navigate(`/group/${group?._id}/post/${item._id}`, {
                    state: { post: item, group }
                  })}>
                  <b>Xem chi tiết</b>
                </Button>
              </div>


              <div className="mt-2"> </div>
            </CardContent>

          </Card>

        })


      }


    </>

  )
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);