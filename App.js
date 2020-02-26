import React from 'react'
import { Text, View } from 'react-native'
// Import FaceDetector from expo lib
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';

const cameraStyle = { flex: 1 }
const flexCenterStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }
import Glasses from './Mask'
/*
class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      faces: [] // initialize found faces with empty array
    }
    this.onCameraPermission = this.onCameraPermission.bind(this)
    // bind the callbacks
    // to set the correct context
    this.onFacesDetected = this.onFacesDetected.bind(this)
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
  }

  componentDidMount() {
    Permissions
      .askAsync(Permissions.CAMERA)
      .then(this.onCameraPermission)
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  // implement face detection callback function
  onFacesDetected({ faces }) {
    // print the found face data to console
    console.log(faces)
    // store faces to component state
    this.setState({ faces })
  }

  // implement face detection error function
  onFaceDetectionError(error) {
    console.log(error)
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />
    }

    if (hasCameraPermission === false) {
      return (
        <View style={flexCenterStyle}>
          <Text>No access to camera</Text>
        </View>
      )
    }

    return (
      <View style={cameraStyle}>
        {/*
          Enable face detector in camera component
          mode: fast or accurate,
          detectLandmarks: whether to get the eyes, nose, mouth position
          runClassifications: eyes open and smiling probability
         */

/*}
<Camera
  style={cameraStyle}
  type={Camera.Constants.Type.front}
  faceDetectorSettings={{
    mode: FaceDetector.Constants.Mode.fast,
    detectLandmarks: FaceDetector.Constants.Landmarks.all,
    runClassifications: FaceDetector.Constants.Classifications.all
  }}
  onFacesDetected={this.onFacesDetected}
  onFacesDetectionError={this.onFacesDetectionError}
/>
</View>
)
}
}

export default MainView
*/
let id = 0
class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      faces: [],
      name: null
    }
    this.onCameraPermission = this.onCameraPermission.bind(this)
    this.onFacesDetected = this.onFacesDetected.bind(this)
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
  }

  componentDidMount() {
    Permissions
      .askAsync(Permissions.CAMERA)
      .then(this.onCameraPermission)
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  onFacesDetected({ faces }) {
    //   console.log(faces)
    this.setState({ faces })
    //  let v = 0
    //   v++
    //  console.log(v)
  }

  onFaceDetectionError(error) {

    console.log(error)
  }

  render() {
    console.disableYellowBox = true;
    // Read faces by destructuring state
    const { faces, hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />
    }

    if (hasCameraPermission === false) {
      return (
        <View style={flexCenterStyle}>
          <Text>No access to camera</Text>
        </View>
      )
    }

    return (
      <View style={cameraStyle}>
        <Camera
          style={cameraStyle}
          type={Camera.Constants.Type.front}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.all
          }}
          onFacesDetected={this.onFacesDetected}
          onFacesDetectionError={this.onFacesDetectionError}
        />

        {
          //For each face draw the mask
          faces.map(face => <Glasses key={face.faceID} face={face} />)
        }

      </View>
    )
  }
}

export default MainView