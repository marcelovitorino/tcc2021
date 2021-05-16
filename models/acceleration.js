const mongoose = require('../database/index');

const AccelerationSchema = mongoose.Schema({
    data: {
        type: Object,
        required: true,
        accel: {
            type: Object,
            required: true,
            accelX: {
                type: String,
                required: true  
            },
            accelY: {
                type: String,
                required: true  
            },
            accelZ: {
                type: String,
                required: true   
            }
        },
        gyro: {
            type: Object,
            required: true,
            gyroX: {
                type: String,
                required: true 
            },
            gyroY: {
                type: String,
                required: true 
            },
            gyroZ: {
                type: String,
                required: true 
            }
        },
        temp: {
            type: Number
        }
    },
    nodeID: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Acceleration = mongoose.model('Acceleration', AccelerationSchema)

module.exports = Acceleration; 