//    backbone-mongodb.js
//    (c) 2011 Done.

(function() {

  // Save a reference to the global object.
  var root = this;
  
  // Require Backbone and Underscore if we're on the server, and it's not already present
  var isServer = (typeof require !== 'undefined');
  
  var Backbone = root.Backbone;
  var _ = root._;
  var MongoDBDocument;
  
  if (!Backbone && isServer) Backbone = require('backbone');
  if (!_ && isServer) _ = require('underscore')._;
  
  var MongoDb = {};

  // MongoDb models
  // --------------  
  MongoDb.models = {

    Document: Backbone.Model.extend({
      idAttribute: '_id',  // provides the mongo _id for documents
      models: {},          // mapping of attributes to models (optional)
            
      get : function(attr) {
        return this._prepareAttribute(attr);
      },

      // Create the attribute with the right 
      _prepareAttribute : function(attr) {
        var value = this.attributes[attr];
        if(attr in this.models) {
          value = new this.models[attr](value);
          value.container = this;
        }
        return value;
      }
    }),
  };
      
  // Patch Backbone
  // --------------
  
  // Add mongoDB behavior to the Document
  if (isServer) {
    var MongoDBDocument = require('./lib/mongodb-document');
    _.extend(MongoDb.models.Document.prototype, MongoDBDocument);
  }
  
  Backbone.MongoDb = MongoDb;
  _.extend(Backbone, MongoDb.models);
    
}).call(this);
