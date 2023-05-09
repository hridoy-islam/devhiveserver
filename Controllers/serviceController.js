const serviceModel = require('../Model/serviceModel')


const createService = async (req, res) => {
    const newService = req.body;
    const result = await serviceModel.create(newService);
    res.send(result)
}

const getService = async (req, res) => {
    // const page = req.query.page ? parseInt(req.query.page) : 1;
    // const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    // const skipIndex = (page - 1) * limit;
    // const services = await serviceModel.find({}).skip(skipIndex).limit(limit);
    // console.log(req.params.price);
    const services = await serviceModel.find({})
    // const services = await serviceModel.find({"developerinfo.price": { $lte: Number(req.params.price)}})
    res.json(services);

}

const getSingleService = async (req, res) => {
    console.log("test2", req.params.di);

    const service = await serviceModel.findById(req.params.id)
    res.json(service);
}

// const service = await serviceModel.find({ "developerinfo.price": { $lte: Number(req.params.price) } })



const queryService = async (req, res) => {
    console.log("test1", req.params.query);
    const queryData = await serviceModel.find({ "developerInfo.title": req.params.query })
    // console.log(queryData);
    res.json(queryData);
}

const updateService = async (req, res) => {
    const id = req.params.id;
    const updatedValue = req.body
    const filter = { _id: id };
    const service = await serviceModel.findOneAndUpdate(filter, updatedValue, {
        new: true,
    })
    res.send(service)
}

const deleteService = async (req, res) => {
    const id = req.params.id;
    const service = await serviceModel.deleteOne({ id });
    console.log(service)
    res.send(service)
}


module.exports = {
    createService,
    getService,
    updateService,
    deleteService,
    getSingleService,
    queryService
}