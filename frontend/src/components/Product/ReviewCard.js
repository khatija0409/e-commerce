import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/profile.png";
const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: " #0a5aa9",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
      };
return <div className="reviewCard">
<img src={profilePng} alt="UserProfilePciture"/>
<p>
    {review.name}
</p>
<ReactStars {...options}/>
<span className="reviewCardComment">
    {review.comment}
</span>


</div>;

  
};

export default ReviewCard;