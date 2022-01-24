const categoryController = require('../../src/controllers/categoryController');
const categoryModel =require('../../src/models/category');

const { mockResponse, mockRequest } = require("../mocker");
const jestMock = require('jest-mock');
const express = require("express");

const testPayload=[
    {
    categoryId : 1,
    name : "Electronics"
},
{
    categoryId : 2,
    name : "Fashion"
}
];



it('The category controller should return error',async() =>{
    const req = mockRequest();
    const res = mockResponse();
    const spy = jestMock.spyOn(categoryModel,'listCategories').mockImplementation((cb) =>{
        cb(new Error("This is a error"),null);
    });
    await categoryController.listCategories(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        msg: "Error in fetching categories",
        success:false,
    });
});



it('The category controller should return all the categories',async() =>{
    const req = mockRequest();
    const res = mockResponse();
    const spy = jestMock.spyOn(categoryModel,'listCategories').mockImplementation((cb) =>{
        cb(null,testPayload);
    });
    await categoryController.listCategories(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        success : true,
        msg : "Successfully fetched",
        categories: testPayload,
        success:true,
    })
});