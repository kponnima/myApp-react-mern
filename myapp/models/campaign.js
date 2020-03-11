/*
 *  Campaign model schema
 */
'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

//create schema for todo
const CampaignSchema = new Schema({
  requestId: {
    type: Number,
    unique: true,
    required: true,
    default: 10000
  },
  requestorName: {
    type: String,
    // required: true
  },
  requestorEmail: {
    type: String,
    // required: true
  },
  requestorLeaderName: {
    type: String,
    // required: true
  },
  requestorLeaderEmail: {
    type: String,
    // required: true
  },
  campaignMarketingManager: {
    type: String,
    // required: true
  },
  secondaryCampaignMarketingManager: {
    type: String,
    // required: true
  },
  gmoCampaignManager: {
    type: String,
    // required: true
  },
  campaignName: {
    type: String,
    // required: true
  },
  movableInkCode: {
    type: String,
    // required: true
  },
  campaignLine: {
    type: String,
    // required: true
  },
  responsibilityCenter: {
    type: String
  },
  campaignDescription: {
    type: String,
    // required: true
  },
  creativeFile: {
    type: String,
    // required: true
  },
  emailType: {
    type: String,
    // required: true
  },
  businessUnit: {
    type: String,
    // required: true
  },
  primaryCMOptOut: {
    type: String,
    // required: true
  },
  additionalOptOutSelection: {
    type: Boolean,
    required: true
  },
  additionalOptOut: {
    type: String
  },
  oneClickProgramSelection: {
    type: Boolean,
    required: true
  },
  oneclickProgram: {
    type: String
  },
  edisTemplateSelection: {
    type: Boolean,
    required: true
  },
  edisTemplateName: {
    type: String
  },
  edisTemplateDescription: {
    type: String
  },
  edisTemplateLink: {
    type: String
  },
  campaignMetrics: {
    type: String,
    // required: true
  },
  cardProducts: {
    type: Array,
    // required: true
  }
},
  {
    collection: 'campaigns'
  }
);

// CampaignSchema.methods.greet = function() { return 'Hello, ' + this.name; };

//create model for Campaign
export default mongoose.model('Campaign', CampaignSchema);

// var CounterSchema = new Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 10000 }
// },
//   {
//     collection: 'counters'
//   }
// );

// var counter = mongoose.model('counter', CounterSchema);

// CampaignSchema.pre('save', function (next) {
//   // Don't increment if this is NOT a newly created document
//   if (!this.isNew) return;
//   var campaign = this;
//   counter.findByIdAndUpdate({ _id: 'description_info.request_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, count) {
//     if (error) {
//       return next(error);
//     }
//     campaign.description_info.request_id = count.seq;
//     logger.info('IN METHOD - server.models.campaign.saveCampaign - requestID : ' + campaign.description_info.request_id);
//     next();
//   });
// });