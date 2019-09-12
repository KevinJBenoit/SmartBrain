import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'cb4e2548750644a8b30819481c13b595'
})

const particleOptions = {
  polygon: {
    enable: true,
    type: 'inside',
    move: {
        radius: 10
    },
    url: 'path/to/svg.svg'
  }
}

//we need state so its a class
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      //route keeps track of where we are on the page
      route: 'signin',
      isSignedIn: false,
      user: {
        id: 0,
        email: "",
        entries: 0,
        joined: '',
        name: "",
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      name: data.name,
    }})
  }

  calculateFaceLocation = (info) => {
    const clarifaiFace = info.outputs[0].data.regions[0].region_info.bounding_box;
    //getting the image, put the id in image tag in FaceRecognition.js
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //will return an object for the box attribute in state
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  //will set the this.state.box with the data calculated from the calculateFaceLocation function
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  //an event listener, part of the App class, must pass event that is happening on an input
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        // URL
        //needs to be input instead of imageUrl (which would give an error b/c React)
        this.state.input
    )
    //need to work your way through the response to get the bounding box that we want
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    }

  // function for changing the page after singing in
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route})
  }

  render() {
    //instead of using this.state.____ we can destructure with const { isSignedIn, imageUrl, route, box } = this.state to use directly
    return (
      <div className="App">
        <Particles className='particles' params={{particleOptions}} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* if/else statement shorthand, if we need to sing in, then display SignIn, else display the rest */}
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              {/* passing onInputChange AND onSubmit as a prop to ImageLinkForm (which needs to have these parameters in function defintion) */}
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            : (
              this.state.route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
      
    );
  }
}

export default App;
