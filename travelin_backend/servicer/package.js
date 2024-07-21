import packModel from "../models/package.js";

let packService = [];
packService.findOne = (findPattern) => {
    return new Promise(async (resolve, reject) => {
        try {
            const savedData = await packModel.findOne(findPattern)
            resolve(savedData)
        } catch (e) {
            console.log(e)
            reject()
        }
    })
}

export default packService