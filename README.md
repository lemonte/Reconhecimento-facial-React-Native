# Reconhecimento-facial-React-Native
Projeto de Reconhecimento facial em react native com expo ..

O projeto mostra a % do quanto você está sorrindo, a % que o olho esquerdo e direito estão abertos alem da angulação da cabeça em relação ao ponto inicial

necessita da instalação do expo 

para isso siga os passos no link https://medium.com/@guimaraessilas/desenvolvimento-mobile-com-react-native-d10ae5dd2e04

Após tudo instalado rode no terminal o seguinte comando  

expo init nome do projeto

selecione a opçao blank

depois de tudo instalado rode no terminal o seguinte comando

cd nome do projeto

yarn start ou npm start

rode no terminal os comandos "expo install expo-face-detector"  e  "expo install expo-camera"  (Obs: sem as aspas)

Para saber mais sobre essas bibliotecas acesso a documentação do expo no link https://docs.expo.io/versions/latest/sdk/camera/

Agora partindo para o codigo substitua em App.js o codigo que ja vem padrao por

## Video do projeto 



https://user-images.githubusercontent.com/48225849/164895484-c43b58de-9975-484b-b5be-4654f41dc8b3.mp4




# CÓDIGO MainView

      import React from 'react'
      import { Text, View } from 'react-native'
      import * as FaceDetector from 'expo-face-detector';
      import * as Permissions from "expo-permissions";
      import { Camera } from 'expo-camera';

      const cameraStyle = { flex: 1 }
      const flexCenterStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }
      import Mask from './Mask'
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
                faces.map(face => <Mask key={face.faceID} face={face} />)
              }

            </View>
          )
        }
      }
      export default MainView




em seguida crie uma pasta chamada 

Mask dentro da raiz do projeto 

Abra a pasta

e crie o aruivo index.js dentro da pasta

e cole o seguinte codigo 




# Código 2 Mask
      import React from 'react'
      import { Image } from 'react-native';
      import { Text, View } from 'react-native';
      console.disableYellowBox = true;
      const Mask = ({
          face: {
              bounds: {
                  origin: { x: containerX, y: containerY },
                  size: { width: faceWidth, height: faceHeight }
              },
              leftEyePosition,
              noseBasePosition, // nose position
              rightEyePosition,
              smilingProbability,
              rightEyeOpenProbability,
              rollAngle,
              leftEyeOpenProbability
              //  leftEyePosition,
              //  rightEyePosition
          }
      }) => {
          const glassesWidth = faceWidth
          const glassesHeight = faceHeight / 2.2
          const eyeWidth = faceWidth / 4
          const pupilWidth = eyeWidth / 8
          // Define nose width
          const noseWidth = eyeWidth;
          const transformAngle = (
              angleRad = Math.atan(
                  (rightEyePosition.y - leftEyePosition.y) /
                  (rightEyePosition.x - leftEyePosition.x)
              )
          ) => angleRad * 180 / Math.PI
          const translatedEyePositionX = eyePosition => eyePosition.x - eyeWidth / 3 - containerX
          const translatedEyePositionY = eyePosition => eyePosition.y - eyeWidth / 2 - containerY

          const translatedLeftEyePosition = {
              x: translatedEyePositionX(leftEyePosition),
              y: translatedEyePositionY(leftEyePosition)
          }
          const translatedRightEyePosition = {
              x: translatedEyePositionX(rightEyePosition),
              y: translatedEyePositionY(rightEyePosition)
          }

          const eyeStyle = (eyePosition, eyeBorderWidth = eyeWidth / 10) => ({
              position: 'absolute',
              left: eyePosition.x,
              top: eyePosition.y,
              borderRadius: eyeWidth,
              width: eyeWidth,
              height: eyeWidth,
              borderWidth: eyeBorderWidth,
              borderColor: 'blue',
          });

          const adjustedPupilPosition = coord => coord + eyeWidth / 2 - pupilWidth / 2
          const pupilStyle = (eyePosition) => ({
              position: 'absolute',
              left: adjustedPupilPosition(eyePosition.x),
              top: adjustedPupilPosition(eyePosition.y),
              borderRadius: pupilWidth,
              width: pupilWidth,
              height: pupilWidth,
              backgroundColor: 'black'
          });

          // Define style for nose component
          // Set the nose angle according to face angle
          const noseTransformAngle = (
              angleRad = Math.atan(
                  (rightEyePosition.y - leftEyePosition.y) /
                  (rightEyePosition.x - leftEyePosition.x)
              )

          ) => angleRad * 180 / 3

          const noseStyle = () => ({
              fontSize: noseWidth,
              position: 'absolute',
              left: noseBasePosition.x - glassesWidth / 50 - containerX,
              top: noseBasePosition.y - glassesHeight / 1.3 - containerY,
              transform: [{ rotate: `${transformAngle()}deg` }]
          })

          return (
              <>
                  <View style={{
                      position: 'absolute',
                      left: leftEyePosition.x - glassesWidth * 0.82,
                      top: leftEyePosition.y - glassesHeight * 0.4
                  }}>
                      <Image
                          source={require('../assets/glasses.png')}
                          style={{
                              width: glassesWidth * 1.3,
                              height: glassesHeight,
                              resizeMode: 'contain',
                              transform: [{ rotate: `${transformAngle()}deg` }]
                          }}
                      />
                      <Text style={{ ...noseStyle() }}>🐽</Text>
                  </View>
                  <View>
                      {smilingProbability ? (
                          <>
                              <Text style={{ fontSize: 12, color: "black" }}>Chance de sorrir</Text>
                              <Text style={{ fontSize: 12, color: "black" }}> {Math.round(smilingProbability * 100)}%</Text>
                              <Text style={{ fontSize: 12, color: "black" }}>Probabilidade de abertura do olho direito</Text>
                              <Text style={{ fontSize: 12, color: "black" }}> {Math.round(rightEyeOpenProbability * 100)}%</Text>
                              <Text style={{ fontSize: 12, color: "black" }}>Probabilidade de abertura do olho esquerdo</Text>
                              <Text style={{ fontSize: 12, color: "black" }}> {Math.round(leftEyeOpenProbability * 100)}%</Text>
                              <Text style={{ fontSize: 12, color: "black" }}>Angulacao da cabeça</Text>
                              <Text style={{ fontSize: 12, color: "black" }}> {Math.round(rollAngle)}º</Text>

                          </>
                      ) : null}


                  </View>

              </>
          );
      };
      export default Mask




em seguida abra no seu emulador rodando o codigo yarn run android ou yarn run ios
ou abra em seu dispositivo fisico escaneando o QR que será gerado quando iniciar o projeto 
