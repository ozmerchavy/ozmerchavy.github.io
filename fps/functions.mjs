function sensor(nameWithSpeed) {
    say(nameWithSpeed.toLowerCase())
    const sensies = sensors.filter(x => x.Sensor.toLowerCase().includes(nameWithSpeed.toLowerCase()))
    if (!sensies) {
        console.error(`Could not find sensor ${nameWithSpeed}!`)
        return
    }
    return sensies[0]
}

function getAllcamerasNames() {
    return sensors.map(s => s.Sensor)

}


function getSensorProperties(cameraAndMode, height, width, interfaceSelection, links, bitness) {
    const sensorInfo = sensor(cameraAndMode)
    const bandwidth = interfacesBandwidth[interfaceSelection]
    const totalBandwidth = links * bandwidth * 10 ** 9
    const CLK_PIX = sensorInfo['Sensor Clock']
    const CLK_PIX_Period = 1 / CLK_PIX
    const LVDSLines = sensorInfo['Multiplexer CH']
    const LVDSLinesTotal = sensorInfo['Multiplexer CH Total']
    const readoutBlackLines = 14 // /////////// SHOULD PROBABLY BE IN SENSOR INFO CURRENTLY IS NOT
    const lineSize = bitness * width
    const lineRate = totalBandwidth / lineSize
    const shortesSensorLineTime = 1 / lineRate
    const shortestLineTime = (shortesSensorLineTime * LVDSLines) / (LVDSLinesTotal * CLK_PIX_Period)
    const shortestSensorLineTimes = sensorInfo['min line duration']
    const lineULength = Math.ceil(Math.max(shortestSensorLineTimes, Math.ceil(shortestLineTime))/4)*4
    const actualLineTime = lineULength * CLK_PIX_Period * LVDSLinesTotal / LVDSLines
    const TFOT = sensorInfo['fps_line_duration_factor'] * lineULength * CLK_PIX_Period
    const TRD = (height + readoutBlackLines + sensorInfo['fps_min_line_count']) * actualLineTime
    const TFRM = TFOT + TRD
    const maxFPS = 1 / TFRM

    return maxFPS

}

