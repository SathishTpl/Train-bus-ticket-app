const trainsModel = require("../models/train.model");
const busesModel = require("../models/bus.model");

const daysArr = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];


function convertToDay(date = null) {
    let day = daysArr[new Date().getDay() - 1]
    console.log(day);
    if (date) {
        day = daysArr[new Date(date).getDay() - 1]
        console.log(day);
    }
    return day;
}

async function sampleDataImport() {
    const TrainsCount = await trainsModel.TrainModel.collection.countDocuments();
    const EndpointsCount = await trainsModel.EndPointsModel.collection.countDocuments();
    if (TrainsCount == 0 && EndpointsCount == 0) {
        let sampleData = require('../trainsData.json');
        trainsModel.TrainModel.insertMany(sampleData.trains).then((TData) => {
            trainsModel.EndPointsModel.insertMany(sampleData['trains-endpoints']).then((EPData) => {
                console.log("Sample data imported successfully!")
            }).catch((err) => {
                console.log('Unable to create entries in trains-endpoints collection: ' + err.message)
            })
        }).catch((err) => {
            console.log('Unable to create entries in trains collection: ' + err.message)
        })
    } else {
        console.log({ 'message': 'Seems DB already have the data.', TrainsCollectionsCount: TrainsCount, EndPointsCollectionsCount: EndpointsCount })
    }
}

// busDatas

async function busSampleDataImport() {
    const BusesCount = await busesModel.BusModel.collection.countDocuments();
    const EndpointsCount = await busesModel.EndPointsModel.collection.countDocuments();
    if (BusesCount == 0 && EndpointsCount == 0) {
        let sampleData = require('../busesData.json');
        busesModel.BusesModel.insertMany(sampleData.Buses).then((TData) => {
            busesModel.EndPointsModel.insertMany(sampleData['buses-endpoints']).then((EPData) => {
                console.log("Sample data imported successfully!")
            }).catch((err) => {
                console.log('Unable to create entries in buses-endpoints collection: ' + err.message)
            })
        }).catch((err) => {
            console.log('Unable to create entries in buses collection: ' + err.message)
        })
    } else {
        console.log({ 'message': 'Seems DB already have the data.', BusesCollectionsCount: BusesCount, EndPointsCollectionsCount: EndpointsCount })
    }
}


module.exports = {
    convertToDay,
    sampleDataImport,
    busSampleDataImport
}