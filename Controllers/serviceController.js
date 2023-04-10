const serviceModel = require('../Model/serviceModel')


const createService = async (req, res) =>{
    const newService = req.body;
    const result = await serviceModel.create(newService);
    res.send(result)
} 
const getService = async (req, res) =>{
    const services = await serviceModel.find({}).limit(20);
    res.json(services);
    
}
const getSingleService = async (req, res) =>{
    const service = await serviceModel.findById(req.params.id);
    res.json(service);
    
}
const updateService = async (req, res) =>{
    const id = req.params.id;
    const updatedValue = req.body
    const filter = {_id: id};
    const service = await serviceModel.findOneAndUpdate(filter, updatedValue, {
        new: true,
    })
    res.send(service)
}
const deleteService = async (req, res) =>{
    const id = req.params.id;
    const service = await serviceModel.deleteOne({id});
    console.log(service)
    res.send(service)
} 


module.exports={createService, getService, updateService, deleteService, getSingleService}