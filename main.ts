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
        
    if (ms > 0) {
        basic.pause(ms)
        driveStop()
    }
}

function driveStop () {
    pins.servoWritePin(AnalogPin.P1, 90)
    pins.servoWritePin(AnalogPin.P2, 90)
}

function turn(direction : Direction, ms : number = 100) {
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


basic.forever(function () {
	
})
