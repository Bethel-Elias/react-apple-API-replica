import { useEffect, useState } from 'react'
import './YouTube.css'

function Youtube() {
   let [Videos,setVideos]= useState([]);

   useEffect(() => {

    const fetchData = async()=>{
try {
  
  const res = await  fetch(
     "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmGuOxdS9S-JsDNqRJYYoaqFq9xjRGdhg&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet&order=date&maxResults=8"
  
   );
   const data = await res.json();
     
      //  console.log(data);
       setVideos(data?.items);
} catch (error) {
  console.error(error);
}}
   fetchData();
  

    },[]);




  return (
    <>
      <div className="allVideosWrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold video-title-wrapper">
                <h1>Apple Videos</h1>
              </div>
            </div>
            {Videos?.map((singleVideo, i) => {
              let vidId = singleVideo.id.videoId;
              let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
              let videoWrapper = (
                <div key={i} className="col-sm-12 col-md-6 col-lg-4">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="_blank">
                        <img src={singleVideo.snippet.thumbnails.high.url} />
                      </a>
                    </div>
                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="_blank">
                          {singleVideo.snippet.title}
                        </a>
                      </div>
                      <div className="videoDesc">
                        {singleVideo.snippet.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
              return videoWrapper;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Youtube