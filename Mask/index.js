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


/* com as marcas do rosto

    return (
        <>
            <View style={{ position: 'absolute', left: containerX, top: containerY }}>
                <View style={{ ...eyeStyle(translatedLeftEyePosition) }} />

                <View style={{ ...eyeStyle(translatedRightEyePosition) }} />

                </View>
                <View style={{
                    position: 'absolute',
                    left: leftEyePosition.x - glassesWidth * 0.69,
                    top: leftEyePosition.y - glassesHeight * 0.4
                }}>
                    <View style={{
                        width: faceWidth, height: faceHeight, borderWidth: 3,
                        borderColor: "blue",
                        position: 'absolute',
                        borderRadius: faceHeight
                    }} />


                </View >
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

*/

/* oculos e nariz


     return (
        <>
            <View style={{
                position: 'absolute',
                left: leftEyePosition.x - glassesWidth * 0.69,
                top: leftEyePosition.y - glassesHeight * 0.4
            }}>
                <Image
                    source={require('../assets/glasses.png')}
                    style={{
                        width: glassesWidth,
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


*/





/*
import React from 'react'

// Import Text component
import { Text, View } from 'react-native';

const Mask = ({
  face: {
    bounds: {
      origin: { x: containerX, y: containerY },
      size: { width: faceWidth }
    },
    leftEyePosition,
    noseBasePosition, // nose position
    rightEyePosition
  }
}) => {
  const eyeWidth = faceWidth / 4
  const pupilWidth = eyeWidth / 5
  // Define nose width
  const noseWidth = eyeWidth;

  const translatedEyePositionX = eyePosition => eyePosition.x - eyeWidth / 2 - containerX
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
    borderColor: 'black',
    backgroundColor:'yellow'
  });

  const adjustedPupilPosition = coord => coord + eyeWidth / 2 - pupilWidth / 2
  const pupilStyle = (eyePosition) => ({
    position: 'absolute',
    left: adjustedPupilPosition(eyePosition.x),
    top: adjustedPupilPosition(eyePosition.y),
    borderRadius: pupilWidth,
    width: pupilWidth,
    height: pupilWidth,
    backgroundColor:'black'
  });

  // Define style for nose component
  // Set the nose angle according to face angle
  const noseTransformAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
      (rightEyePosition.x - leftEyePosition.x)
    )
  ) => angleRad * 180 / Math.PI

  const noseStyle = () => ({
    fontSize: noseWidth,
    position: 'absolute',
    left: noseBasePosition.x - noseWidth / 2 - containerX,
    top: noseBasePosition.y - noseWidth / 2 - containerY,
    transform: [{ rotate: `${noseTransformAngle()}deg`}]
  })

  return (
    <View style={{ position: 'absolute', left: containerX, top: containerY }}>
      <View style = {{...eyeStyle(translatedLeftEyePosition)}} />
      <View style = {{...pupilStyle(translatedLeftEyePosition)}} />
      <View style = {{...eyeStyle(translatedRightEyePosition)}} />
      <View style = {{...pupilStyle(translatedRightEyePosition)}} />
      {/* Add nose component */
/*
}
<Text style={{...noseStyle()}}>🐽</Text>
</View>
);
};

export default Mask

*/