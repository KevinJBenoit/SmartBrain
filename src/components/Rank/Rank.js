import React from 'react';

//simple component with no state, so just a function
const Rank = () => {
    return (
        <div>
            <div className='white f3'>
                {'Kevin, your current detection rank is'}
            </div>
            <div className='white f1'>
                {'#1'}
            </div>
        </div>
    );
}

export default Rank;