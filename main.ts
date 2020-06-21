let sensorLeft = 0
let sensorRight = 0
let robotMode = "waiting"
let isFullSpeed = false

pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)

function driveBackward (ms: number = 0) {
    pins.servoWritePin(AnalogPin.P1, 180)
    pins.servoWritePin(AnalogPin.P2, 0)
    if (ms > 0) {
        basic.pause(ms)
        driveStop()
    }
}

// go forward slowly - to remove "jumping"
function driveForward (ms: number = 0) {
    if(!isFullSpeed) {
        pins.servoWritePin(AnalogPin.P1, 85)
        pins.servoWritePin(AnalogPin.P2, 95)
        basic.pause(50)

        pins.servoWritePin(AnalogPin.P1, 80)
        pins.servoWritePin(AnalogPin.P2, 100)
        basic.pause(50)

        pins.servoWritePin(AnalogPin.P1, 70)
        pins.servoWritePin(AnalogPin.P2, 120)
        basic.pause(30)

        pins.servoWritePin(AnalogPin.P1, 0)
        pins.servoWritePin(AnalogPin.P2, 180)
    }
    isFullSpeed = true
    if (ms > 0) {
        basic.pause(ms)
        driveStop()
    }
}

function driveStop () {
    pins.servoWritePin(AnalogPin.P1, 90)
    pins.servoWritePin(AnalogPin.P2, 90)
    isFullSpeed = false
}

function turn(direction : Direction, ms : number = 100) {
    isFullSpeed = false
    if(direction == Direction.Right) {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 95)       
        basic.pause(50)

        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 100)
        basic.pause(50)

        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 120)
        basic.pause(30)
        
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 180)
    } else {
        pins.servoWritePin(AnalogPin.P1, 85)
        pins.servoWritePin(AnalogPin.P2, 90)              
        basic.pause(30)

        pins.servoWritePin(AnalogPin.P1, 60)
        pins.servoWritePin(AnalogPin.P2, 90)
        basic.pause(50)
        
        pins.servoWritePin(AnalogPin.P1, 0)
        pins.servoWritePin(AnalogPin.P2, 90)
        basic.pause(50)
    }
    basic.pause(ms)
    driveStop()
}

function readSensors() {
    sensorRight = pins.digitalReadPin(DigitalPin.P15)
    sensorLeft = pins.digitalReadPin(DigitalPin.P16)
}

function turnUntilSensor(direction: Direction){
    turn(direction)
    readSensors()

    if(direction == Direction.Right) {
        if(sensorRight == 0) {
            turn(Direction.Right)
        }
    } else {
        if(sensorLeft == 0) {
            turn(Direction.Left)
        }       
    }
    pause(50)
}

function followTheLine() {
    readSensors()
    
    if (sensorRight == 1 && sensorLeft == 1) { // move forward
    	driveForward() 
    } else if (sensorRight == 1 && sensorLeft == 0) { // turn left
    	turnUntilSensor(Direction.Left)
    } else if (sensorRight == 0 && sensorLeft == 1) { // turn right
    	turnUntilSensor(Direction.Right)    	
    } else { // stop
        driveStop()
    }
}

input.onButtonPressed(Button.A, function () {
    pause(100)
    robotMode = "followTheLine"
})

input.onButtonPressed(Button.B, function () {
    robotMode = "STOP"
    driveStop()
})

basic.forever(function () {
    if(robotMode == "followTheLine") {
        followTheLine()
    }	
})
