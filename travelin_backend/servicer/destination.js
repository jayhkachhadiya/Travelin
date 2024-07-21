import destiModel from "../models/destination.js";

let destiService = []

destiService.findOne = (findPattern) => {
    return new Promise(async (resolve, reject) => {
        try {
            const destiData = await destiModel.findOne(findPattern)
            resolve(destiData)
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}

export default destiService;