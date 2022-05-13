import React, { useState } from "react";
import Heart from "react-animated-heart";

export const HeartComponent = () => {
  const [isLiked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const handleLike = () => {
    setLiked(!isLiked);
    !isLiked
      ? setNumberOfLikes(numberOfLikes + 1)
      : setNumberOfLikes(numberOfLikes - 1);
  };

  return (
    <div className="row align-items-center heart">
      <Heart
        isClick={isLiked}
        onClick={(() => setLiked(!isLiked), handleLike)}
      />
      <h5>{numberOfLikes} Likes</h5>
    </div>
  );
};
