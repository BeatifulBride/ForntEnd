import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const LikeButton = ({ dressIndex, isLiked, onToggleLike }) => (
    <div onClick={() => onToggleLike(dressIndex)}>
        {isLiked ? <MdFavorite size="2.2em"/> : <MdFavoriteBorder size="2.2em"/>}
    </div>
);

export default LikeButton;
