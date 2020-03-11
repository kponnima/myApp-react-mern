/* GET CAMPAIGN for ADMIN*/
export async function getAllCampaigns(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.getAllCampaigns');
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    await Campaign.find({
    }, async (err, aircrafts) => {
      if (err) {
        logger.error('ERROR IN METHOD - server.api.campaign.getAllCampaigns - failed with error: ' + JSON.stringify(err));
        return await res.status(401).send({ success: false, msg: 'Unable to find records!' });
      }
      if (!aircrafts) {
        logger.error('ERROR IN METHOD - server.api.campaign.getAllCampaigns - no records found in db');
        return await res.status(402).send({ success: false, msg: 'no records found!' });
      } else {
        // get the list of aircrafts
        logger.info('METHOD EXIT - server.api.campaign.getAllCampaigns - successfully fetched records from db');
        return await res.status(200).json(aircrafts);
      }
    });
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.getAllCampaigns - unauthorized to fetch records from db');
    return await res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* CREATE CAMPAIGN */
export async function createCampaign(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.createCampaign');
  let token = await utils.getHeaderToken(req.headers);

  if (token) {
    try {
      await Campaign.save(
        req.body
        , async (err, campaign) => {
          if (err) {
            logger.error('ERROR IN METHOD - server.api.campaign.saveCampaign - failed with error: ' + err);
            return await next(err);
          }
          if (!campaign) {
            logger.error('ERROR IN METHOD - server.api.campaign.saveCampaign - unable to find the campaign');
            return await res.status(500).send({ success: false, msg: 'Campaign not found.' });
          }

          logger.info('METHOD EXIT - server.api.campaign.saveCampaign - successfully updated record in db');
          return await res.json(campaign);
        });
    } catch (error) {
      if (error) {
        logger.error('ERROR IN METHOD - server.api.campaign.createCampaign - failed with error: ' + JSON.stringify(error));
        return res.status(403).send({ success: false, msg: 'Save failed!' });
      }
    }
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.createCampaign - unauthorized to insert record to db');
    return await res.status(401).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* GET SINGLE CAMPAIGN BY ID */
export async function getCampaignDetail(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.getCampaignDetail');
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    Campaign.find({
      "description_info.request_id": req.params.request_id
    }, async (err, campaign) => {
      if (err) {
        logger.error('ERROR IN METHOD - server.api.campaign.getCampaignDetail - failed with error: ' + err);
        return await next(err);
      }
      if (!campaign) {
        logger.error('ERROR IN METHOD - server.api.campaign.getCampaignDetail - no records found in db');
        return await res.status(403).send({ success: false, msg: 'Search failed. Campaign not found.' });
      } else {
        logger.info('METHOD EXIT - server.api.campaign.getCampaignDetail - successfully fetched records from db');
        return await res.status(200).json(campaign);
      }
    });
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.getCampaignDetail - unauthorized to fetch records from db');
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* UDPATE CAMPAIGN */
export async function updateCampaign(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.updateCampaign');
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    Campaign.findOneAndUpdate(
      req.params.aircraft_no, req.body
      , async (err, campaign) => {
        if (err) {
          logger.error('ERROR IN METHOD - server.api.campaign.updateCampaign - failed with error: ' + err);
          return await next(err);
        }
        logger.info('METHOD EXIT - server.api.campaign.updateCampaign - successfully updated record in db');
        return await res.json(campaign);
      });
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.updateCampaign - unauthorized to update record in db');
    return await res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* SAVE CAMPAIGN */
export async function saveCampaign(req, res) {
  console.log('saveCampaign req.body***', req.body);
  logger.info('METHOD ENTRY - server.api.campaign.saveCampaign');
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    let requestID = req.body.description_info && req.body.description_info.request_id;
    if (requestID && requestID !== 'NEW') {
      let campaign = await Campaign.findOneAndUpdate({ 'description_info.request_id': requestID }, req.body, { new: true });
      if (!campaign) {
        logger.error('ERROR IN METHOD - server.api.campaign.saveCampaign - unable to find the campaign');
        return await res.status(500).send({ success: false, msg: 'Campaign not found.' });
      } else {
        logger.info('METHOD EXIT - server.api.campaign.saveCampaign - successfully saved record in db');
        return await res.json(campaign);
      }
    } else {
      delete req.body.description_info.request_id;
      let newCampaign = new Campaign(req.body);

      // let counter = new Counter();
      Counter.findByIdAndUpdate({ _id: 'description_info.request_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, count) {
        if (error) {
          return next(error);
        }
        newCampaign.description_info.request_id = count.seq;
        requestID = count.seq;
        logger.info('IN METHOD - server.models.campaign.saveCampaign - requestID : ' + requestID);

        newCampaign.save(function (err) {
          if (err) {
            logger.error('FAILED while save collection. Error: ' + JSON.stringify(err));
            return err;
          }
          logger.info('METHOD EXIT - server.api.campaign.saveCampaign - successfully saved record in db');
          return res.json({
            success: true, requestID: requestID, msg: 'Successful created new campaign with ID: ' + requestID,
            campaign: newCampaign
          });
        });
      });
    }
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.saveCampaign - unauthorized to update record in db');
    return await res.status(401).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* SEARCH CAMPAIGN */
async function searchCampaign(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.searchCampaign');
  console.log('req.body', req.body);
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    Campaign.find(
      {
        "description_info.request_id": req.body.request_id,
        "description_info.email_type": req.body.email_type
      }, async (err, campaign) => {
        if (err) {
          logger.error('ERROR IN METHOD - server.api.campaign.searchCampaign - failed with error: ' + err);
          return await next(err);
        }
        logger.info('METHOD EXIT - server.api.campaign.searchCampaign - successfully updated record in db');
        return await res.json(campaign);
      });
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.searchCampaign - unauthorized to update record in db');
    return await res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}
/* DELETE CAMPAIGN */
async function deleteCampaign(req, res) {
  logger.info('METHOD ENTRY - server.api.campaign.deleteCampaign');
  let token = await utils.getHeaderToken(req.headers);
  if (token) {
    Campaign.findOneAndRemove(
      { 'aircraft_no': req.params.aircraft_no }, async (err) => {
        if (err) {
          logger.error('ERROR IN METHOD - server.api.campaign.deleteCampaign - failed with error: ' + err);
          return await next(err);
        }
        logger.info('METHOD EXIT - server.api.campaign.deleteCampaign - successfully deleted record in db');
        return await res.status(200).send({ success: true, msg: 'Sucessfully deleted !' });
      });
  } else {
    logger.error('ERROR IN METHOD - server.api.campaign.deleteCampaign - unauthorized to delete record in db');
    return await res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}