import React from 'react';
import NoteeDispatcher from '../dispatcher/NoteeDispatcher'
import NoteeConstants from '../constants/NoteeConstants'
import assign from 'object-assign'
import request from 'superagent'

var CHANGE_EVENT = 'change';

var EventEmitter = require('events').EventEmitter;

function notee_create(content) {
    request
        .post("/notee/api/posts")
        .send(content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function notee_update(content) {
    request
        .put("/notee/api/posts/" + content.params_id)
        .send(content.content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function notee_delete(notee_id){
    request
        .delete("/notee/api/posts/" + notee_id)
        .end(function(err, res){
            console.log(res.body);
        })
}

function image_create(content){
    request
        .post("/notee/api/images")
        .attach("image", content)
        .end(function(err, res){
            console.log(err);
            console.log(res.body);
            NoteeStore.emitChange();
        })
}

function image_delete(image_id){
    request
        .delete("/notee/api/images/" + image_id)
        .end(function(err, res){
            console.log(res.body);
        })
}

function category_create(content) {
    request
        .post("/notee/api/categories")
        .send(content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function category_update(content) {
    request
        .put("/notee/api/categories/" + content.id)
        .send(content.content)
        .end(function(err, res){
            console.log(res.body);
        })
}

function category_delete(category_id){
    request
        .delete("/notee/api/categories/" + category_id)
        .end(function(err, res){
            console.log(res.body);
        })
}


var NoteeStore = assign({}, EventEmitter.prototype, {

    loadNotee: function(notee_id, callback) {
        var url = "/notee/api/posts/" + notee_id;
        request.get(url, (err, res) => {
            callback(res.body.post);
        })
    },

    loadAllNotees: function(callback) {
        request.get('/notee/api/posts', (err, res) => {
            callback(res.body.posts);
        });
    },

    loadAllImages: function(callback) {
        request.get('/notee/api/images', (err, res) => {
            callback(res.body.images);
        });
    },

    loadAllCategories: function(callback) {
        var url = "/notee/api/categories";
        request.get(url, (err, res) => {
            console.log(res.body);
            callback(res.body.categories);
        })
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }

});

NoteeDispatcher.register(function(action) {

    switch(action.type) {
        // notee
        case NoteeConstants.NOTEE_CREATE:
            notee_create(action.content);
            break;
        case NoteeConstants.NOTEE_UPDATE:
            notee_update(action.content);
            break;
        case NoteeConstants.NOTEE_DELETE:
            notee_delete(action.notee_id);
            break;

        // image
        case NoteeConstants.IMAGE_CREATE:
            image_create(action.content);
            break;
        case NoteeConstants.IMAGE_DELETE:
            image_delete(action.image_id);
            break;

        // category
        case NoteeConstants.CATEGORY_CREATE:
            category_create(action.content);
            break;
        case NoteeConstants.CATEGORY_UPDATE:
            category_update(action.content);
            break;
        case NoteeConstants.CATEGORY_DELETE:
            category_delete(action.category_id);
            break;

        default:
            console.log("default");
        // no op
    }
});

module.exports = NoteeStore;