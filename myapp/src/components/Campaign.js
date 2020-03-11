import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

import { create } from '../services/campaignService';

import Description from './sections/Description';
import Scheduling from './sections/Scheduling';
import Mailplan from './sections/Mailplan';
import MarketingAutomation from './sections/MarketingAutomation';
import Personalization from './sections/Personalization';
import Attachment from './sections/Attachment';
import RevisionRequired from './modals/RevisionRequired';

import * as Constants from '../constants';

const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
// const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// expression.test(String(email).toLowerCase());
const initialState = {
  message: '', campaignLoading: false, formSubmitted: false, draft: true, submittedForApproval: false, submittedForReview: false,
  submittedToESP: false, requestId: 0, requestorName: '', requestorEmail: '', requestorLeaderName: '', requestorLeaderEmail: '',
  campaignMarketingManager: '', secondaryCampaignMarketingManager: '', gmoCampaignManager: '', campaignName: '', movableInkCode: '',
  campaignLine: '', responsibilityCenter: '', campaignDescription: '', creativeFile: '', emailType: '', businessUnit: '',
  primaryCMOptOut: '', additionalOptOutSelection: false, additionalOptOut: '', oneClickProgramSelection: false, oneclickProgram: '',
  edisTemplateSelection: false, edisTemplateName: '', edisTemplateDescription: '', edisTemplateLink: '', campaignMetrics: '',
  cardProducts: [], deploymentDate: '', campaignDuration: '', estimatedEndDate: '', buDeploymentSlot: '', throttledSelection: false,
  specificTimeSelection: false, specialTestingSelection: false, sendTimeOptimizedSelection: false
};
const campaignElements = ['requestId', 'requestorName', 'requestorEmail', 'requestorLeaderName', 'requestorLeaderEmail',
  'campaignMarketingManager', 'secondaryCampaignMarketingManager', 'gmoCampaignManager', 'campaignName', 'movableInkCode',
  'campaignLine', 'campaignDescription', 'creativeFile', 'emailType', 'businessUnit', 'primaryCMOptOut', 'additionalOptOutSelection',
  'additionalOptOut', 'oneClickProgramSelection', 'oneclickProgram', 'edisTemplateSelection', 'edisTemplateName', 'edisTemplateDescription',
  'edisTemplateLink', 'campaignMetrics', 'cardProducts', 'deploymentDate', 'campaignDuration', 'estimatedEndDate', 'buDeploymentSlot',
  'throttledSelection', 'specificTimeSelection', 'specialTestingSelection', 'sendTimeOptimizedSelection'];
const extraElements = ['message', 'campaignLoading', 'formSubmitted', 'draft', 'submittedForApproval', 'submittedForReview', 'submittedToESP'];

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
    // this.campaignRef = React.createRef();
    this.fileInput = React.createRef();
    this.state = { ...initialState };
  }

  componentDidMount() {
    // let { id } = useParams();
    // console.log('id', id);
    // console.log(this.props);
    // let id = this.props.match.params.id;
    // console.log('id', id);
    this.setState({ requestId: this.props.match.params.id });
    // console.log('this.state.requestId', this.state.requestId);
    // this.campaignRef.current.scrollTo(0, 0);
    // ReactDOM.findDOMNode(this).scrollIntoView();
  }

  async componentDidMount() {
    try {
      this.setState({campaignLoading : true});
      window.scrollTo(0, 0);
      this.setState({ requestId: this.props.match.params.id });
      const apiData = await { cardProducts: [...this.state.cardProducts, target.id]
      const expenses = apiData.data.listExpenses.items
      this.setState({ expenses, loading: false });
    } catch (err) {
      this.setState({ message: 'Failed to fetch expense.Try again later!' });
      console.log('error: ', err);
      this.setState({campaignLoading : false});
    }
  }

  handleChange(e) {
    const target = e.target;
    // console.log('target', target);
    const name = target.name;
    // console.log('name', name);
    // console.log('target.id', target.id);
    var value;
    switch (target.type) {
      case 'checkbox':
        value = target.checked;
        break;
      case 'radio':
        if (name === 'oneclickProgram') {
          value = target.value;
        } else {
          value = (target.value === 'true');
        }
        break;
      default:
        value = target.value;
    }
    // console.log('value', value);
    if (name === 'cardProducts') {
      if (this.state.cardProducts.includes(target.id)) {
        var array = [...this.state.cardProducts];
        var index = array.indexOf(target.id);
        array.splice(index, 1);
        this.setState({ cardProducts: array });
      } else {
        this.setState({ cardProducts: [...this.state.cardProducts, target.id] });
      }
    } else if (name === 'creativeFile') {
      if (value) {
        this.setState({ creativeFile: (this.fileInput.current.files && this.fileInput.current.files[0] && this.fileInput.current.files[0].name) });
      }
    } else if ((name === 'edisTemplateSelection') && (value === false)) {
      this.setState({ edisTemplateSelection: value, edisTemplateName: '', edisTemplateDescription: '', edisTemplateLink: '' });
    } else if (name === 'edisTemplateName') {
      const { edisTemplates } = Constants;
      const obj = edisTemplates.find(x => x.name === value);
      this.setState({ edisTemplateName: value, edisTemplateDescription: obj.description, edisTemplateLink: obj.link });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleClick(e) {
    const { name, value } = e.target;
    // console.log('name', name);
    // console.log('value', value);
    if (name === 'deleteCreativeFile') {
      this.setState({ creativeFile: '' });
    }
  }

  handleDateChange = deploymentDate => {
    this.setState({ deploymentDate });
  };

  handleSubmit = async (e, action) => {
    e.preventDefault();
    this.setState({ message: '', formSubmitted: true, submittedForApproval: true, campaignLoading: true });
    const { requestId, requestorName, requestorEmail, requestorLeaderName, requestorLeaderEmail, campaignMarketingManager,
      secondaryCampaignMarketingManager, gmoCampaignManager, campaignName, movableInkCode, campaignLine, responsibilityCenter,
      campaignDescription, creativeFile, emailType, businessUnit, primaryCMOptOut, additionalOptOutSelection, additionalOptOut,
      oneClickProgramSelection, oneclickProgram, edisTemplateSelection, edisTemplateName, edisTemplateDescription, edisTemplateLink,
      campaignMetrics, cardProducts, deploymentDate, campaignDuration, estimatedEndDat, buDeploymentSlot,
      throttledSelection, specificTimeSelection, specialTestingSelection, sendTimeOptimizedSelection } = this.state;
    // const data = Object.assign({}, this.state);
    // const data = _.omit(this.state, extraElements);
    const data = { ...this.state };
    for (var index in extraElements) { delete data[extraElements[index]]; };
    console.log('data', data);

    // if (requestId === '' || requestorName === '' || requestorEmail === '' || requestorLeaderName === '' || requestorLeaderEmail === '' ||
    //   campaignMarketingManager === '' || secondaryCampaignMarketingManager === '' || gmoCampaignManager === '' || campaignName === '' ||
    //   movableInkCode === '' || campaignLine === '' || campaignDescription === '' || creativeFile === '' ||
    //   emailType === '' || businessUnit === '' || primaryCMOptOut === '' || (additionalOptOutSelection && additionalOptOut === '') ||
    //   (oneClickProgramSelection && oneclickProgram === '') || campaignMetrics === '' || cardProducts === '' ||
    //   (edisTemplateSelection && (edisTemplateName === '' || edisTemplateDescription === '' || edisTemplateLink === '')) ||
    //   deploymentDate === '' || campaignDuration === '' || estimatedEndDat === '' || buDeploymentSlot,
    //   throttledSelection === '' || specificTimeSelection === '' || specialTestingSelection === '' || sendTimeOptimizedSelection === '') {
    //   this.setState({  message: 'Mandatory fields are missing.Check the entries and try again.', campaignLoading: false, submittedForApproval: false,   });
    //   return;
    // }

    // if (!requestorEmail.match(emailRegex) || !requestorLeaderEmail.match(emailRegex)) {
    //   this.setState({ message: 'Entered email is invalid !', campaignLoading: false, submittedForApproval: false });
    //   return;
    // }

    var response;
    try {
      response = await create('/api/create-campaign', data);
    } catch (e) {
      response = e;
    }
    console.log('response', response);
    if (response && response._id) {
      this.handleReset();
      this.handleSuccess()
    } else {
      this.handleError();
    }
  }

  handleReset() {
    this.setState(initialState);
  }

  handleSuccess() {
    this.setState({ message: 'Create campaign successful!', formSubmitted: false, campaignLoading: false });
    this.props.history.push('/');
  }

  handleError() {
    console.log("Error in create campaign!");
    this.setState({ message: 'Error while creating campaign!', formSubmitted: false, submittedForApproval: false, campaignLoading: false });
  }

  render() {
    const { requestId, message, campaignLoading, draft, submittedForApproval, submittedForReview, submittedToESP } = this.state;
    return (
      <>
        <form className="needs-validation" noValidate>
          {message !== '' &&
            <div className="alert alert-danger alert-dismissible" role="alert">
              {message}
            </div>
          }

          <div className="row justify-content-end" role="group">
            {
              (!draft && (requestId !== 0)) &&
              <div className="col-xs-12 col-md-1 mb-3">
                <button className="btn btn-info btn-sm btn-block" type="button" data-toggle="modal" data-target="#staticBackdrop">Copy</button>
              </div>
            }
            {
              !submittedToESP &&
              <div className="col-xs-12 col-md-1 mb-3">
                {(requestId !== 0) && <button className="btn btn-success btn-sm btn-block" type="button"
                  onClick={(e) => { this.handleSubmit(e, 'save') }}>Save</button>}
                {(requestId === 0) && <button className="btn btn-success btn-sm btn-block" type="button"
                  onClick={(e) => { this.handleSubmit(e, 'create') }}>Create</button>}
              </div>
            }
            {
              (draft && (requestId !== 0) && !submittedForApproval && !submittedForReview && !submittedToESP) &&
              <div className="col-xs-12 col-md-2 mb-3">
                <button className="btn btn-primary btn-sm btn-block"
                  type="submit" onClick={(e) => { this.handleSubmit(e, 'submitForAdminApproval') }}>Submit For Approval</button>
              </div>
            }
            {
              (!draft && (requestId !== 0) && submittedForApproval && !submittedForReview && !submittedToESP) &&
              <div className="col-xs-12 col-md-2 mb-3">
                <button className="btn btn-primary btn-sm btn-block" type="button" onClick={this.submitCampaignForAdminReview}>Submit For Review</button>
              </div>
            }
            {
              (!draft && (requestId !== 0) && !submittedForApproval && submittedForReview && !submittedToESP) &&
              <div className="col-xs-12 col-md-2 mb-3">
                <button className="btn btn-primary btn-sm btn-block"
                  type="button" onClick={this.submitCampaignToESP}>Submit To ESP</button>
              </div>
            }
            {
              (!draft && (requestId !== 0) && !submittedForApproval && !submittedForReview && submittedToESP) &&
              <div className="col-xs-12 col-md-2 mb-3">
                <button className="btn btn-danger btn-sm btn-block" type="button" onClick={this.campaignRollBack}>Roll Back</button>
              </div>
            }
            {
              (!draft && (requestId !== 0) && !submittedForApproval && submittedForReview && !submittedToESP) &&
              <div className="col-xs-12 col-md-2 mb-3">
                <button className="btn btn-warning btn-sm btn-block"
                  type="button" data-toggle="modal" data-target="#staticBackdrop">Revision Required</button>
              </div>
            }
          </div>
          {/*
          {campaignLoading &&
            <>
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
              </div>
            </>
          } */}
          {campaignLoading && <LinearProgress />}

          <div className="card">
            <div className="card-header">
              <nav className="nav nav-pills flex-column flex-sm-row" id="pills-tab" role="tablist">
                <a className="flex-sm-fill text-sm-center nav-link active" id="pills-description-tab" data-toggle="pill" href="#pills-description" role="tab" aria-controls="pills-description" aria-selected="true">Description</a>
                <a className="flex-sm-fill text-sm-center nav-link" id="pills-scheduling-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false">Scheduling</a>
                <a className={'flex-sm-fill text-sm-center nav-link' + (draft ? ' disabled' : '')} aria-disabled={draft} id="pills-mailplan-tab" data-toggle="pill" href="#pills-mailplan" role="tab" aria-controls="pills-mailplan" aria-selected="false">MailPlan</a>
                <a className={'flex-sm-fill text-sm-center nav-link' + (draft ? ' disabled' : '')} aria-disabled={draft} id="pills-marketingautomation-tab" data-toggle="pill" href="#pills-marketingautomation" role="tab" aria-controls="pills-marketingautomation" aria-selected="false">Marketing Automation</a>
                <a className={'flex-sm-fill text-sm-center nav-link' + (draft ? ' disabled' : '')} aria-disabled={draft} id="pills-personalization-tab" data-toggle="pill" href="#pills-personalization" role="tab" aria-controls="pills-personalization" aria-selected="false">Personalization</a>
                <a className={'flex-sm-fill text-sm-center nav-link' + (draft ? ' disabled' : '')} aria-disabled={draft} id="pills-attachment-tab" data-toggle="pill" href="#pills-attachment" role="tab" aria-controls="pills-attachment" aria-selected="false">Attachment</a>
              </nav>
            </div>
            <div className="card-body">
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                  <Description description={this.state} fileRef={this.fileInput} onDescriptionChange={this.handleChange} onDescriptionClick={this.handleClick}></Description>
                </div>
                <div className="tab-pane fade" id="pills-scheduling" role="tabpanel" aria-labelledby="pills-scheduling-tab">
                  <Scheduling scheduling={this.state} onSchedulingChange={this.handleChange} onSchedulingDataChange={this.handleDateChange}></Scheduling>
                </div>
                <div className="tab-pane fade" id="pills-mailplan" role="tabpanel" aria-labelledby="pills-mailplan-tab">
                  <Mailplan></Mailplan>
                </div>
                <div className="tab-pane fade" id="pills-marketingautomation" role="tabpanel" aria-labelledby="pills-marketingautomation-tab">
                  <MarketingAutomation></MarketingAutomation>
                </div>
                <div className="tab-pane fade" id="pills-personalization" role="tabpanel" aria-labelledby="pills-personalization-tab">
                  <Personalization></Personalization>
                </div>
                <div className="tab-pane fade" id="pills-attachment" role="tabpanel" aria-labelledby="pills-attachment-tab">
                  <Attachment></Attachment>
                </div>
              </div>
            </div>
          </div>
        </form >
        {/* RevisionRequired Modal */}
        <RevisionRequired></RevisionRequired>
      </>

    );
  }
}

export default Campaign;