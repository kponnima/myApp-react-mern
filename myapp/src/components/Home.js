import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as Constants from './../constants';

class Home extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { emailType: '' };
  }

  exportCampaigns() {

  }

  handleClick() {
    console.log('Click happened');
  }

  handleChange(event) {
    console.log(' event.target.value ',  event.target.value );
    console.log(' event.target.value ',  typeof(event.target.value));
    this.setState({ emailType: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  searchCampaignFormReset() {

  }

  render() {
    const emailTypes = Constants.emailTypes;
    const campaignsLoading = false;
    const campaigns = [{ request_id: 123, requestor_name: "test_user1", campaign_name: "test_campaignName1", email_type: "OneOff", business_unit: "CCSG" },
    { request_id: 345, requestor_name: "test_user2", campaign_name: "test_campaignName2", email_type: "OneOff", business_unit: "CCSG" }
    ];
    return (
      <>
        <div className="row">
          <div className="col">
          <Link to="/campaign/new-campaign" className="btn btn-primary float-right">Create Campaign</Link>
          </div>
          <div className="col">
            <button className="btn btn-primary" type="button" onClick={this.exportCampaigns}>Export</button>
          </div>
        </div >

        <br />

        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">SEARCH</h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label col-form-label-sm">Request ID</label>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <input type="number" className="form-control form-control-sm" id="inputEmail3" placeholder="Request ID"
                        required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label col-form-label-sm">Email Type</label>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <select className="form-control form-control-sm" id="inputPassword3" required value={this.state.emailType}
                        onChange={this.handleChange}>
                        <option disabled value="">Choose...</option>
                        {
                          emailTypes.map(function (emailType) {
                            return <option key={emailType.value} value={emailType.value}>{emailType.viewValue}</option>;
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                      <button type="submit" className="btn btn-success btn-sm">Search</button>
                      <button className="btn btn-secondary btn-sm ml-3" type="button" onClick={this.searchCampaignFormReset}>Clear</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            {campaignsLoading && <div>
              <mat-progress-bar mode="indeterminate" value="50"></mat-progress-bar>
            </div>}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">CAMPAIGNS</h5>
                {((!campaigns || campaigns.length === 0) && !campaignsLoading) &&
                  <div className="row">
                    <div className="col">
                      <div className="alert alert-danger" role="alert">
                        There are no campaigns saved.
                      </div>
                    </div>
                  </div>
                }
                {(campaigns && campaigns.length > 0 && !campaignsLoading) &&
                  <div className="table-responsive">
                    <table className="table table-hover table-borderless" style={{ height: '100px' }}>
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">Request ID</th>
                          <th scope="col">Requestor Name</th>
                          <th scope="col">Campaign Name</th>
                          <th scope="col">Email Type</th>
                          <th scope="col">Business Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          campaigns.map(function (campaign) {
                            return <tr key={campaign.request_id}>
                              <th scope="row" className="text-center">
                                <Link to={`/campaign/${campaign.request_id}`} className="font-weight-normal text-decoration-none">{campaign.request_id}</Link>
                              </th>
                              <td className="align-middle">{campaign.requestor_name}</td>
                              <td>{campaign.campaign_name}</td>
                              <td className="align-middle">{campaign.email_type}</td>
                              <td className="align-middle">{campaign.business_unit}</td>
                            </tr>;
                          })
                        }
                      </tbody>
                    </table >
                  </div >
                }
              </div >
            </div >
          </div >
        </div >
      </>
    );
  }
}

export default Home;