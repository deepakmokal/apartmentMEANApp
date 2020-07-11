const dotenv = require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');

userRoles = {
    "adminRole": [
        'Create owner', 
        'View owners',
        'Update owners',
        'Delete owners',
        'Maintainace details',
        'Brodcast notice',
        'Complaint Box'
    ],
    "userRole": [
        'Manage acc',
        'View owners',
        'Payment and histories',
        'Book amenities',
        'Notice board',
        'Register complaint'
    ]
}



module.exports = userRoles;