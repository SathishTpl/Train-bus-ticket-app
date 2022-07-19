const { Schema, model } = require('mongoose');

const busSchema = new Schema({
    busName: String,
    busNo: String,
    days: String,
    totalSeats: Number
}, { timestamps:true });

const busEndPointsSchema = new Schema({
    startPoint: String,
    destPoint: String,
    departureTime: String,
    arrivalTime: String,
    fare: Number,
    trainNo: String
}, { timestamps:true });

const busBookingSchema = new Schema({
    bookingDate: Schema.Types.Date,
    busNo: String,
    seatNo: String,
    noOfSeats: Number,
    status: Number,
    epId: String,
    userId: String
}, { timestamps:true });

module.exports = {
    busModel: model('buses', busSchema),
    EndPointsModel: model('buses-endpoints', busEndPointsSchema),
    BookingModel: model('buses-booking',busBookingSchema),
}