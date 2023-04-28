import {StarFill, StarHalf, Star as StarEmpty} from 'react-bootstrap-icons';

export function FiveStarRating({rating}){
    // Declare icon array
    const starList = [];

    // Sore number of filled stars
    const starFillCount = Math.floor(rating);

    //store if yes or no there is half star
    const hasHalfStar = rating - parseInt(rating) >= 0.5;

    // store the number of empty stars
    const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0);

    // push filled star icons
    for (let i = 1; i <= starFillCount; i++){
        starList.push(<StarFill key={'star-fill' + i}/>);
    }

    // push 1 halfstar icon if necessary
    if (hasHalfStar) {
        starList.push(<StarHalf key={'star-half'}/>);
    }

    // push empty stars
    for (let i = 1; i <= emptyStarCount; i++){
        starList.push(<StarEmpty key={'star-empty' + i}/>);
    }

    //render star icon array
    return (
        <div>
            {starList}
        </div>);
}