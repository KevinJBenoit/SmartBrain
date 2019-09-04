import React from 'react';
import './ImageLinkForm.css'

//simple component with no state, so just a function (parameters is destructuring the object passed, which has 2)
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {/* JS way of putting in text instead of directly  */}
                {'This SmartBrain will detect faces in images.'}
            </p>
            {/* we created the class 'center' in App.css b/c it will probably be used a lot */}
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;