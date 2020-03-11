import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as Constants from '../../constants';

class Scheduling extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {};
  }

  handleChange(e) {
    this.props.onSchedulingChange(e);
  }

  handleDateChange = deploymentDate => {
    this.props.onSchedulingDataChange(deploymentDate);
  }

  render() {
    const { campaignDurationWeeks } = Constants;
    const { formSubmitted, requestId, emailType, businessUnit, edisTemplateSelection, deploymentDate, campaignDuration, estimatedEndDate, buDeploymentSlot,
      throttledSelection, specificTimeSelection, specialTestingSelection, sendTimeOptimizedSelection } = this.props.scheduling;
    return (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Deployment Description</h5>
            <div className="card-subtitle alert alert-primary font-italic" role="alert">
              With supporting text below as a natural lead-in to additional content.
        </div>

            <div className="form-group row">
              <label htmlFor="deploymentDate" className="col-sm-2 col-form-label text-info lb-md required">Deployment date:<sup>*</sup></label>
              <div className={'col' + (formSubmitted && !deploymentDate ? ' was-validated' : '')}>
                <input className="form-control text-muted" type="date" min="09/01/2019" name="deploymentDate" id="deploymentDate" placeholder="01/01/1971"
                  value={deploymentDate} onChange={this.handleChange} required />
                {/* <DatePicker placeholderText="Click to select a date" selected={deploymentDate} onChange={this.handleDateChange} /> */}
                {formSubmitted && !deploymentDate && <div className="invalid-feedback">Value is required.</div>}
              </div>
              <label htmlFor="campaignDuration" className="col-sm-2 col-form-label text-info lb-md">Campaign duration:</label>
              <div className={'col-sm-4' + (formSubmitted && !campaignDuration ? ' was-validated' : '')}>
                <select name="campaignDuration" id="campaignDuration" className="custom-select text-muted"
                  value={campaignDuration} onChange={this.handleChange} required>
                  <option disabled value="">Select Campaign Duration</option>
                  {
                    campaignDurationWeeks.map(function (campaignDurationWeek) {
                      return <option key={campaignDurationWeek.id} value={campaignDurationWeek.value}>{campaignDurationWeek.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !campaignDuration && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="estimatedEndDate" className="col-sm-2 col-form-label text-info lb-md">Estimated End Date:</label>
              <div className={'col' + (formSubmitted && !estimatedEndDate ? ' was-validated' : '')}>
                <input className="form-control text-muted" type="date" min="09/01/2019" name="deploymentDate" id="deploymentDate" placeholder=""
                  value={estimatedEndDate} onChange={this.handleChange} disabled />
              </div>
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-info lb-md">BU Deployment Slot:</label>
              <div className={'col' + (formSubmitted && !buDeploymentSlot ? ' was-validated' : '')}>
                <input className="form-control text-muted" type="date" min="09/01/2019" name="buDeploymentSlot" id="buDeploymentSlot" placeholder="01/01/1971"
                  value={buDeploymentSlot} onChange={this.handleChange} required />
                {formSubmitted && !buDeploymentSlot && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>
          </div>
        </div>

        <br></br>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Additional Deployment Details</h5>
            <div className="card-subtitle alert alert-primary font-italic" role="alert">
              With supporting text below as a natural lead-in to additional content.
          </div>

            <div className="form-group row">
              <label htmlFor="throttledSelection1" className="col-sm-2 col-form-label text-info lb-md">Need to be throttled?</label>
              <div className="col mt-2">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="throttledSelection" id="throttledSelection1"
                    className={'custom-control-input' + (formSubmitted && (throttledSelection !== true && throttledSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={throttledSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="throttledSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="throttledSelection" id="throttledSelection2"
                    className={'custom-control-input' + (formSubmitted && (throttledSelection !== true && throttledSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={throttledSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="throttledSelection2">No</label>
                </div>
                {formSubmitted && (throttledSelection !== true && throttledSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
              <label htmlFor="specificTimeSelection1" className="col-sm-2 col-form-label text-info lb-md">Need to be deployed at a specific time?</label>
              <div className="col mt-3">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="specificTimeSelection" id="specificTimeSelection1"
                    className={'custom-control-input' + (formSubmitted && (specificTimeSelection !== true && specificTimeSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={specificTimeSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="specificTimeSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="specificTimeSelection" id="specificTimeSelection2"
                    className={'custom-control-input' + (formSubmitted && (specificTimeSelection !== true && specificTimeSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={specificTimeSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="specificTimeSelection2">No</label>
                </div>
                {formSubmitted && (specificTimeSelection !== true && specificTimeSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="specialTestingSelection1" className="col-sm-2 col-form-label text-info lb-md">Have special testing requirements?
              (i.e Persado, SFMC A/B testing, etc.)</label>
              <div className="col mt-3">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="specialTestingSelection" id="specialTestingSelection1"
                    className={'custom-control-input' + (formSubmitted && (specialTestingSelection !== true && specialTestingSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={specialTestingSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="specialTestingSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="specialTestingSelection" id="specialTestingSelection2"
                    className={'custom-control-input' + (formSubmitted && (specialTestingSelection !== true && specialTestingSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={specialTestingSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="specialTestingSelection2">No</label>
                </div>
                {formSubmitted && (specialTestingSelection !== true && specialTestingSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
              <label htmlFor="sendTimeOptimizedSelection1" className="col-sm-2 col-form-label text-info lb-md">Need to be send time optimized?</label>
              <div className="col mt-3">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="sendTimeOptimizedSelection" id="sendTimeOptimizedSelection1"
                    className={'custom-control-input' + (formSubmitted && (sendTimeOptimizedSelection !== true && sendTimeOptimizedSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={sendTimeOptimizedSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="sendTimeOptimizedSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="sendTimeOptimizedSelection" id="sendTimeOptimizedSelection2"
                    className={'custom-control-input' + (formSubmitted && (sendTimeOptimizedSelection !== true && sendTimeOptimizedSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={sendTimeOptimizedSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="sendTimeOptimizedSelection2">No</label>
                </div>
                {formSubmitted && (sendTimeOptimizedSelection !== true && sendTimeOptimizedSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Scheduling;