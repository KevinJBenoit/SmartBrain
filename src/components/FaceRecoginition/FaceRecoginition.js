import React from 'react';

//simple component with no state, so just a function
const FaceRecognition = () => {
    return (
        <div className='center'>
            <img src={'https://samples.clarifai.com/metro-north.jpg'} alt='detected'/>
        </div>
    );
}

export default FaceRecognition;