import joi from "joi";
import mongoose from "mongoose";

const userValidation = joi.object({
    _id: joi.string().optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(6).optional(),
    fullName: joi.string().optional(),
    givenName: joi.string().optional() ,
    familyName: joi.string().optional(),
    role: joi.alternatives().try(
        joi.string(),
        joi.array().items(joi.string())
    ).optional()
    ,
    createdOn: joi.date().optional(),
    lastUpdated: joi.date().optional(),
    __v: joi.number().optional()

})

const userValidation2 = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    fullName: joi.string().required(),
    givenName: joi.string().required() ,
    familyName: joi.string().required(),
    role: joi.alternatives().try(
        joi.string(),
        joi.array().items(joi.string()).optional()
    )
})

const userValidation3 = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})


export default {
    userValidation,
    userValidation2,
    userValidation3
}
