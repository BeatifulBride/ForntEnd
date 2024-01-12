import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import style from './LikeButton.module.css'

const LikeButton = ({ dressIndex, isLiked, onToggleLike }) => (
    <div onClick={() => onToggleLike(dressIndex)}>
        {isLiked ? <MdFavorite className={style.icon} size="2.2em"/> : <MdFavoriteBorder className={style.icon} size="2.2em"/>}
    </div>
);

export default LikeButton;
