'use strict'

const express = require('express');
const companyController = require('../controllers/company.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const connectMultiparty = require('connect-multiparty');
const upload = connectMultiparty({ uploadDir: './uploads/companies'});

//FUNCIÓN PÚBLICA
api.get('/companyTest', companyController.companyTest);


//FUNCIONES PRIVADAS//
//CLIENT//
api.post('/register', companyController.register);
api.post('/login', companyController.login);
api.put('/update/:id', mdAuth.ensureAuth, companyController.update);
api.post('/delete/:id', mdAuth.ensureAuth, companyController.deleteCompany);
api.get('/getBranches', mdAuth.ensureAuth, companyController.searchBranches);
api.get('/getBranch/:id', mdAuth.ensureAuth, companyController.searchBranch);
api.get('/getCompany/:id', mdAuth.ensureAuth, companyController.getCompany);


//FUNCIONES PRIVADAS DEL ADMIN//
api.post('/registerIsAdmin', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.registerIsAdmin);
api.put('/updateIsAdmin/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.updateIsAdmin);
api.delete('/deleteIsAdmin/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.deleteCompanyIsAdmin);
api.get('/getCompanies', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.searchCompanies);
api.post('/searchCompany/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.searchCompany);
api.get('/getBranchesCompany/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.searchBranchesIsAdmin);
api.get('/getBranchIsAdmin/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.searchBranchIsAdmin);
api.get('/getCompanyAdmin/:id', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.getCompanyAdmin);
api.get('/getBranchesIsAdmin', mdAuth.ensureAuth, mdAuth.isAdmin, companyController.getBranchesIsAdmin);

//IMAGENES//
api.post('/uploadImage/:id', [mdAuth.ensureAuth, upload], companyController.addImgCompany);
api.get('/getImage/:fileName',  upload, companyController.getImage);


module.exports = api;