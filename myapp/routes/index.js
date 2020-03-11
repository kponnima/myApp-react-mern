import express from 'express';
let router = express.Router();
import Campaign from '../models/campaign';
import { getAllCampaigns, createCampaign,  } from '../api/campaign';


/* FILE ROUTES */
// router.route('/file-create').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.file.createFile);

/* CAMPAIGN ROUTES */
router.route('/campaign').get(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.getCampaignDetail);
router.route('/campaign-detail/:request_id').get(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.getCampaignDetail);
router.route('/campaigns').get(logMiddleware, passport.authenticate('jwt', { session: false }), getAllCampaigns);
router.route('/campaign-copy').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.createCampaign);
router.route('/campaign-create').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.createCampaign);
router.route('/campaign-edit').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.updateCampaign);
router.route('/campaign-save/:request_id').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.saveCampaign);
router.route('/campaign-search').post(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.searchCampaign);
router.route('/campaign-delete').delete(logMiddleware, passport.authenticate('jwt', { session: false }), api.campaign.deleteCampaign);

router.get('/campaigns', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Campaign.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/create-campaign', (req, res, next) => {
  // console.log('Im here****', req.body);
  if (req.body) {
    Campaign.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/campaign/:id', (req, res, next) => {
  Campaign.findOneAndDelete({ "_id": req.params.id })
    .then(data => res.json(data))
    .catch(next)
});

export default router;