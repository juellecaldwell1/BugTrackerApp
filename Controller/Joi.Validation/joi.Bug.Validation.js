import joi from "joi";
import mongoose from "mongoose";


const validateId = joi.string().custom((value) => {
    if(!mongoose.Types.ObjectId.isValid(value)){
        return console.log("Object ID Not Valid");
        }
        return value
})


const bugValidation = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    stepsToReproduce: joi.string().required()
})

const bugValidation2 = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
    stepsToReproduce: joi.string().optional(),
    author: validateId.optional() ,
    dateTimeCreation: joi.date().optional(),
    classification: joi.string().optional(),
    lastUpdated: joi.date().optional(),
    assignedTo: validateId.optional(), 
    comment: joi.array().items(joi.string(), joi.date()).optional(), 
    resolvedDate: joi.date().optional(),
    stepsToFix: joi.string().optional(),
    timeLogged: joi.number().optional(),
    softwareVersion: joi.string().optional(),
    testCases: validateId.optional() ,
    bugEdits: validateId.optional() , 
    closed: joi.boolean().optional(),
    closedOn: joi.date().optional()
}).options({
    allowUnknown: true,
})


export default {
    bugValidation,
    bugValidation2
}
