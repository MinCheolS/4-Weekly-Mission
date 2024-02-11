import React from 'react';
import '../style/Card.css';
import { Link } from 'react-router-dom';
import undefinedImg from '../assets/share/undefinedImg.svg';

const Card = ({ folderLinkInfo }) => {
  const getCreateDate = (createdAt) => {
    const createDate = new Date(createdAt);
    const formattedDate = `${createDate.getFullYear()}. ${
      createDate.getMonth() + 1
    }. ${createDate.getDate()}`;
    return formattedDate;
  };

  const getTimeDifference = (createdAt) => {
    const createDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceIntime = Math.floor((currentDate - createDate) / 1000);
    const timeInMinute = 60;
    const timeInHour = 3600;
    const timeInDay = 86400;
    const timeInMonth = 2592000;
    const timeInYear = 31536000;

    if (differenceIntime <= timeInMinute) {
      return '1 minute ago';
    } else if (differenceIntime <= timeInHour) {
      const minutes = Math.floor(differenceIntime / timeInMinute);
      return `${minutes} minutes ago`;
    } else if (differenceIntime < timeInDay) {
      const hours = Math.floor(differenceIntime / timeInHour);
      return `${hours} hours ago`;
    } else if (differenceIntime < timeInMonth) {
      const days = Math.floor(differenceIntime / timeInDay);
      return `${days} days ago`;
    } else if (differenceIntime < timeInYear) {
      const months = Math.floor(differenceIntime / timeInMonth);
      return `${months} months ago`;
    } else {
      const years = Math.floor(differenceIntime / timeInYear);
      const remainingMonth = Math.floor(
        (differenceIntime % timeInYear) / timeInMonth
      );

      if (remainingMonth > 0) return `${years} years ago`;
      else return `${years} years ago`;
    }
  };

  return (
    <div className='SharedCardContent'>
      {folderLinkInfo.map((link) => {
        const { createdAt, description, imageSource, url } = link;
        const createDate = getCreateDate(createdAt);
        const timeDifference = getTimeDifference(createdAt);
        const cardImage = {
          backgroundImage:
            imageSource !== undefined
              ? `url(${imageSource})`
              : `url(${undefinedImg})`,
        };

        return (
          <Link to={url} key={link.id}>
            <div className='CardContent'>
              <div className='CardImage' style={cardImage} />
              <div className='CardInfo'>
                <div className='CardInfoHeader'>
                  <span>{timeDifference}</span>
                  <div></div>
                </div>
                <p>{description}</p>
                <span>{createDate}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
