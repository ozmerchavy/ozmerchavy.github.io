



function sensor(sensor, mode){
    const sensies = sensors.filter(x => x.Sensor.toLowerCase() == (sensor.toLowerCase()))
    if (!sensies) {
        console.error(`Could not find sensorOld ${nameWithSpeed}!`)
        return
    }
    return sensies[0][mode]
}


function hexa(num){
    return Math.ceil(parseInt(num, 16))
}

function getModes(sensor){
    const rightSensor = sensors.filter(x => x.Sensor.toLowerCase() == (sensor.toLowerCase()))
    const sens = rightSensor[0]
    return Object.keys(sens).filter(x=>x!="Sensor")

}



function getAllcamerasNames() {
    return sensors.map(s => s.Sensor)

}


function getFps_main(camera, mode, width, height,  interfaceSelection, links, bitness){
    const sensorInfo = sensor(camera, mode)
    const type = sensorInfo['type']
    let result
    if (type == "x5xx"){
        result =  getFps_x5xx(sensorInfo, width, height,  interfaceSelection, links, bitness);
    }
    else if (type==="45xx"){
        result =  getFps_45xx(sensorInfo, width, height,  interfaceSelection, links, bitness)
    }
    else if (type =="25x"){
        result =  getFps_25x(sensorInfo, width, height,  interfaceSelection, links, bitness)

    }
    else if (type == "3265"){
        result =  getFps_3265(sensorInfo, width, height,  interfaceSelection, links, bitness)

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

function getFps_25x(sensorInfo, width, height,  interfaceSelection, links, bitness){


    const bandwidth = interfacesBandwidth[interfaceSelection]  // note the cxp3 in this excel was 2.5 instead of 2.4
    const sampleClock = sensorInfo['Sample clock (Mhz)']
    const shortestHSYNC2Mhzclocks = Math.ceil(hexa(sensorInfo[`HSYNC ${bitness}bit datasheet`])/sensorInfo["Number of ticks for generating 2MHz clock"])
    const shortestHSYNCus = shortestHSYNC2Mhzclocks / sampleClock
    const bitsPerLine = bitness * width
    const lineDurationLimited = bitsPerLine / (bandwidth * 1000)
    const lineDurationSensor = Math.max(lineDurationLimited, shortestHSYNCus)
    const HSYNCActual = Math.ceil(lineDurationSensor * sampleClock)
    const lineDurationActual = HSYNCActual/ sampleClock
    const blankLines = hexa(sensorInfo['VMAX (datasheet)']) - sensorInfo['Max Height (V)']
    const totalFrameTime =  lineDurationActual * (height + blankLines)
    const frameRate = 1000000 / totalFrameTime    
    return frameRate

}


function getFps_3265(sensorInfo, width, height,  interfaceSelection, links, bitness){
    
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



