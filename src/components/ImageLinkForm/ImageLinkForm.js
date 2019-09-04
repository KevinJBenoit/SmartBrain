import React from 'react';
import './ImageLinkForm.css'

//simple component with no state, so just a function
const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {/* JS way of putting in text instead of directly  */}
                {'This SmartBrain will detect faces in images.'}
            </p>
            {/* we created the class 'center' in App.css b/c it will probably be used a lot */}
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;