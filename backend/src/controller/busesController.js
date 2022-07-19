const { EndPointsModel, busModel,BookingModel} = require('../models/bus.model');
const { convertToDay } = require('../services/commonServices');
const busRouter = require('express').Router();

busRouter.get("/", (req, res) => {
    res.send({ message: "Greetings from buses Controller!" })
})

busRouter.get("/getEndPoint", (req, res) => {
    EndPointsModel.find({}, (err, data) => {
        console.log('data',data);
               res.send({data: data,status:true });
    });
})

busRouter.post("/getbuses", (req, res) => {
    let source = req.body.source || '',
    destination = req.body.destination || '',
    day = convertToDay(req.body.date || null);

    console.log('days',day)
    date = req.body.date || '';
    EndPointsModel.find({startPoint: source, destPoint: destination}, (err, data) => {
        if(err) res.send({message: err.message})
        if(data.length == 0) {
            res.send({message: "No data found"})
        }
        let busesArr = [];
        data.forEach(async(item, inx) => {
            let buses = await busModel.find({busNo: item.busNo , days: { $regex: day }})
            if(buses.length > 0) {
                let bookingsCount = await BookingModel.find({bookingDate: date , busNo: item.busNo, status: 1}).countDocuments();
                busesArr.push({
                    ...data[inx].toJSON(),
                    seatAvailability: buses[0].totalSeats - bookingsCount,
                    busInfo: buses[0]
                });
            }
            if(inx == data.length-1)
                res.send({data: busesArr});
        });
    });
})
busRouter.post("/bookBus", (req, res) => {
    let bookingObj = new BookingModel;
    bookingObj.bookingDate = req.body.date;
    bookingObj.busNo = req.body.busNo;
    bookingObj.seatNo = req.body.seatNo;
    bookingObj.noOfSeats = req.body.noofseats;
    bookingObj.status = 1;
    bookingObj.epId = req.body.endPointId;
    bookingObj.userId = req.body.userId;
    bookingObj.save()
        .then(data => res.status(200).send({message: "Bus ticket booked successfully!!!", data, status: 1}))
        .catch(err => res.status(400).send({message:err.message, status: 0}))
});

module.exports = busRouter