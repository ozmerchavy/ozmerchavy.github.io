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


function getFps_main(cameraAndMode, width, height,  interfaceSelection, links, bitness){
    const sensorInfo = sensor(cameraAndMode)
    const type = sensorInfo['type']
    let result
    switch(type){
        case "x5xx":result =  getFps_x5xx(sensorInfo, width, height,  interfaceSelection, links, bitness);
        case "45xx": result =  getFps_45xx(sensorInfo, width, height,  interfaceSelection, links, bitness)
    }

    return Math.floor(result)
}


function getFps_x5xx(sensorInfo, width, height,  interfaceSelection, links, bitness ) {
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



function getFps_45xx(sensorInfo, width, height,  interfaceSelection, links, bitness){
    const bandwidth = interfacesBandwidth[interfaceSelection]  
    const totalBandwidth = links * bandwidth * 10 ** 9
    const CLK_PIX = sensorInfo['Sensor Clock'] / bitness
    const CLK_PIX_Period = 1 / CLK_PIX
    const SOL_EOL = 8
    const pixelPerClock = Math.ceil(width / sensorInfo['Total used MUX'] / 2) * 4
    const readoutBlackLines = 0  
    const lineSize = bitness * width
    const lineRate = totalBandwidth / lineSize
    const shortesProtocolLineTime = 1 / lineRate
    const shortestLineTime = shortesProtocolLineTime / CLK_PIX_Period
    //if there is an error it would likely happen likely here:
    const min_line_time = sensorInfo[`${bitness}bit min line time`] || 0 /// Doesnt appear in the excel. Since not all cams have min line time, || 0
    const sensorLineTime = Math.max(SOL_EOL + pixelPerClock, Math.ceil(min_line_time/4)*4) / 2
    const shortestSensorLineTimes = Math.max(sensorLineTime,Math.ceil(shortestLineTime) )
    const actualLineTime = shortestSensorLineTimes * CLK_PIX_Period
    const TFOT = sensorInfo['FOT in lines']  * shortestSensorLineTimes * CLK_PIX_Period
    const TRD = (height + readoutBlackLines) * actualLineTime
    const TFRM = TFOT + TRD
    const maxFPS = 1 / TFRM

    return maxFPS

}