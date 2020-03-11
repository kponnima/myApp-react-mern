import React, { Component } from 'react';
import axios from 'axios';

import * as Constants from '../../constants';

class Description extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleChange(e) {
    this.props.onDescriptionChange(e);
  }

  handleClick(e) {
    this.props.onDescriptionClick(e);
  }

  render() {
    // const Fragment = React.Fragment;
    const { campaignMarketingManagers, secondaryCampaignMarketingManagers, gmoCampaignManagers, emailTypes, businessUnits, primaryOptOutCategories,
      additionalOptOutCategories, oneClickProgramTypes, edisTemplates, cardProductTypes } = Constants;
    const { formSubmitted, requestId, requestorName, requestorEmail, requestorLeaderName, requestorLeaderEmail, campaignMarketingManager,
      secondaryCampaignMarketingManager, gmoCampaignManager, campaignName, movableInkCode, campaignLine, responsibilityCenter,
      campaignDescription, creativeFile, emailType, businessUnit, primaryCMOptOut, additionalOptOutSelection, additionalOptOut,
      oneClickProgramSelection, oneclickProgram, edisTemplateSelection, edisTemplateName, edisTemplateDescription, edisTemplateLink,
      campaignMetrics, cardProducts } = this.props.description;

    return (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">CAMPAIGN CONTACT INFORMATION</h5>
            <div className="card-subtitle alert alert-primary font-italic" role="alert">
              With supporting text below as a natural lead-in to additional content.
			      </div>

            <div className="form-group row">
              <label htmlFor="requestId" className="col-sm-2 col-form-label text-info lb-md required">Request ID:<sup>*</sup></label>
              <div className={'col' + (formSubmitted && !requestId ? ' was-validated' : '')}>
                <input type="text" readOnly style={{ outline: 'none' }} name="requestId" id="requestId" className="form-control-plaintext text-primary"
                  placeholder="" value={(requestId === 0) ? 'New Campaign' : requestId} onChange={this.handleChange} required />
                {formSubmitted && !requestId && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="requestorName" className="col-sm-2 col-form-label text-info lb-md required">Requestor Name:<sup>*</sup></label>
              <div className={'col' + (formSubmitted && !requestorName ? ' was-validated' : '')}>
                <input type="text" name="requestorName" id="requestorName" className="form-control" placeholder="Requestor name"
                  value={requestorName} onChange={this.handleChange} required />
                {formSubmitted && !requestorName && <div className="invalid-feedback">Value is required.</div>}
              </div>
              <label htmlFor="requestorEmail" className="col-sm-2 col-form-label text-info lb-md">Requestor Email:</label>
              <div className={'col' + (formSubmitted && !requestorEmail ? ' was-validated' : '')}>
                <input type="email" name="requestorEmail" id="requestorEmail" className="form-control" placeholder="Requestor email"
                  value={requestorEmail} onChange={this.handleChange} required />
                {formSubmitted && !requestorEmail && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="requestorLeaderName" className="col-sm-2 col-form-label text-info lb-md">Requestor leader name:</label>
              <div className={'col' + (formSubmitted && !requestorLeaderName ? ' was-validated' : '')}>
                <input type="text" name="requestorLeaderName" id="requestorLeaderName" className="form-control"
                  placeholder="Requestor leader name" value={requestorLeaderName} onChange={this.handleChange} required />
                {formSubmitted && !requestorLeaderName && <div className="invalid-feedback">Value is required.</div>}
              </div>
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-info lb-md">Requestor leader email:</label>
              <div className={'col' + (formSubmitted && !requestorLeaderEmail ? ' was-validated' : '')}>
                <input type="email" name="requestorLeaderEmail" id="requestorLeaderEmail" className="form-control"
                  placeholder="Requestor leader email" value={requestorLeaderEmail} onChange={this.handleChange} required />
                {formSubmitted && !requestorLeaderEmail && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="campaignMarketingManager" className="col-sm-2 col-form-label text-info lb-md">Campaign Marketing Manager:</label>
              <div className={'col-sm-4' + (formSubmitted && !campaignMarketingManager ? ' was-validated' : '')}>
                <select name="campaignMarketingManager" id="campaignMarketingManager" className="custom-select text-muted"
                  value={campaignMarketingManager} onChange={this.handleChange} required>
                  <option disabled value="">Select Campaign Marketing Manager</option>
                  {
                    campaignMarketingManagers.map(function (campaignMarketingManager) {
                      return <option key={campaignMarketingManager.value} value={campaignMarketingManager.value}>{campaignMarketingManager.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !campaignMarketingManager && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="secondaryCampaignMarketingManager" className="col-sm-2 col-form-label text-info lb-md">Secondary Marketing Manager:</label>
              <div className={'col-sm-4' + (formSubmitted && !secondaryCampaignMarketingManager ? ' was-validated' : '')}>
                <select name="secondaryCampaignMarketingManager" id="secondaryCampaignMarketingManager" className="custom-select text-muted"
                  value={secondaryCampaignMarketingManager} onChange={this.handleChange} required>
                  <option disabled value="">Select Secondary Marketing Manager</option>
                  {
                    secondaryCampaignMarketingManagers.map(function (secondaryCampaignMarketingManager) {
                      return <option key={secondaryCampaignMarketingManager.value} value={secondaryCampaignMarketingManager.value}>{secondaryCampaignMarketingManager.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !secondaryCampaignMarketingManager && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="gmoCampaignManager" className="col-sm-2 col-form-label text-info lb-md">GMO Campaign Manager:</label>
              <div className={'col-sm-4' + (formSubmitted && !gmoCampaignManager ? ' was-validated' : '')}>
                <select name="gmoCampaignManager" id="gmoCampaignManager" className="custom-select text-muted"
                  value={gmoCampaignManager} onChange={this.handleChange} required>
                  <option disabled value="">Select GMO Campaign Manager</option>
                  {
                    gmoCampaignManagers.map(function (gmoCampaignManager) {
                      return <option key={gmoCampaignManager.value} value={gmoCampaignManager.value}>{gmoCampaignManager.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !gmoCampaignManager && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>
          </div>
        </div>

        <br></br>

        {/* EMAIL CAMPAIGN DESCRIPION- SUB container */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">CAMPAIGN DESCRIPTION</h5>
            <div className="card-subtitle alert alert-primary font-italic" role="alert">
              With supporting text below as a natural lead-in to additional content.
			      </div>

            <div className="form-group row">
              <label htmlFor="campaignName" className="col-sm-2 col-form-label text-info lb-md">Campaign Name:</label>
              <div className={'col' + (formSubmitted && !campaignName ? ' was-validated' : '')}>
                <input type="text" name="campaignName" id="campaignName" className="form-control" placeholder="Campaign name"
                  value={campaignName} onChange={this.handleChange} required />
                {formSubmitted && !campaignName && <div className="invalid-feedback">Value is required.</div>}
              </div>
              <label htmlFor="movableInkCode" className="col-sm-2 col-form-label text-info lb-md">Movable Ink Code:</label>
              <div className={'col' + (formSubmitted && !movableInkCode ? ' was-validated' : '')}>
                <input type="text" name="movableInkCode" id="movableInkCode" className="form-control" placeholder="Movable Ink Code"
                  value={movableInkCode} onChange={this.handleChange} required />
                {formSubmitted && !movableInkCode && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="campaignLine" className="col-sm-2 col-form-label text-info lb-md">Campaign Line:</label>
              <div className={'col' + (formSubmitted && !campaignLine ? ' was-validated' : '')}>
                <input type="text" name="campaignLine" id="campaignLine" className="form-control" placeholder="11111-11-1111"
                  value={campaignLine} onChange={this.handleChange} required />
                {formSubmitted && !campaignLine && <div className="invalid-feedback">Value is required.</div>}
              </div>
              <label htmlFor="responsibilityCenter" className="col-sm-2 col-form-label text-info lb-md">Responsibility Center:</label>
              <div className="col">
                <input type="text" name="responsibilityCenter" id="responsibilityCenter" className="form-control" placeholder="Responsibility Center"
                  value={responsibilityCenter} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="campaignDescription" className="col-sm-2 col-form-label text-info lb-md">Campaign Description:</label>
              <div className={'col' + (formSubmitted && !campaignDescription ? ' was-validated' : '')}>
                <textarea name="campaignDescription" id="campaignDescription" className="form-control" placeholder="Enter campaign description"
                  value={campaignDescription} onChange={this.handleChange} rows="3" required />
                {formSubmitted && !campaignDescription && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="creativeFile" className="col-sm-2 col-form-label text-info lb-md">Creative Asset:</label>
              <div className={'custom-file col-xs-12 col-md-4 ml-3' + (formSubmitted && !emailType ? ' was-validated mb-3' : '')}>
                <input type="file" name="creativeFile" id="creativeFile" className="custom-file-input" ref={this.props.fileRef}
                  onChange={this.handleChange} required />
                <label className="custom-file-label mr-4 text-muted" htmlFor="creativeFile">Choose file</label>
                {formSubmitted && !creativeFile && <div className="invalid-feedback ml-n3">File is required.</div>}
              </div>
              <div className="col">
                <input type="text" readOnly style={{ outline: 'none' }} name="creativeFile" id="creativeFile" className="form-control-plaintext text-primary" value={creativeFile} />
              </div>
              {creativeFile && <div className="col mt-1">
                <button type="button" name="deleteCreativeFile" className="btn btn-danger btn-sm" onClick={this.handleClick}>Delete</button>
              </div>}
            </div>

            <div className="form-group row">
              <label htmlFor="emailType" className="col-sm-2 col-form-label text-info lb-md">Email Type:</label>
              <div className={'col-sm-4' + (formSubmitted && !emailType ? ' was-validated' : '')}>
                <select name="emailType" id="emailType" className="custom-select text-muted"
                  value={emailType} onChange={this.handleChange} required>
                  <option disabled value="">Select Email Type</option>
                  {
                    emailTypes.map(function (emailType) {
                      return <option key={emailType.value} value={emailType.value}>{emailType.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !emailType && <div className="invalid-feedback">Selection is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="businessUnit" className="col-sm-2 col-form-label text-info lb-md">Business Unit:</label>
              <div className={'col-sm-4' + (formSubmitted && !businessUnit ? ' was-validated' : '')}>
                <select name="businessUnit" id="businessUnit" className="custom-select text-muted"
                  value={businessUnit} onChange={this.handleChange} required>
                  <option disabled value="">Select Business Unit</option>
                  {
                    businessUnits.map(function (businessUnit) {
                      return <option key={businessUnit.value} value={businessUnit.value}>{businessUnit.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !businessUnit && <div className="invalid-feedback">Selection is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="primaryCMOptOut" className="col-sm-2 col-form-label text-info lb-md">Primary Card Member Opt Out Category:</label>
              <div className={'col-sm-4' + (formSubmitted && !primaryCMOptOut ? ' was-validated' : '')}>
                <select name="primaryCMOptOut" id="primaryCMOptOut" className="custom-select text-muted"
                  value={primaryCMOptOut} onChange={this.handleChange} required>
                  <option disabled value="">Select Primary CM Opt Out</option>
                  {
                    primaryOptOutCategories.map(function (primaryOptOutCategory) {
                      return <option key={primaryOptOutCategory.value} value={primaryOptOutCategory.value}>{primaryOptOutCategory.viewValue}</option>;
                    })
                  }
                </select>
                {formSubmitted && !primaryCMOptOut && <div className="invalid-feedback">Selection is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="additionalOptOutSelection1" className="col-sm-2 col-form-label text-info lb-md">Add Additional Opt Out Categories?</label>
              <div className="col mt-3">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="additionalOptOutSelection1" name="additionalOptOutSelection"
                    className={'custom-control-input' + (formSubmitted && (additionalOptOutSelection !== true && additionalOptOutSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={additionalOptOutSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="additionalOptOutSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="additionalOptOutSelection2" name="additionalOptOutSelection"
                    className={'custom-control-input' + (formSubmitted && (additionalOptOutSelection !== true && additionalOptOutSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={additionalOptOutSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="additionalOptOutSelection2">No</label>
                </div>
                {formSubmitted && (additionalOptOutSelection !== true && additionalOptOutSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
              {additionalOptOutSelection &&
                <>
                  <label htmlFor="additionalOptOut" className="col-sm-2 col-form-label text-info lb-md">Additional Opt Out Category:</label>
                  <div className={'col' + (formSubmitted && !additionalOptOut ? ' was-validated' : '')}>
                    <select name="additionalOptOut" id="additionalOptOut" className="custom-select text-muted"
                      value={additionalOptOut} onChange={this.handleChange} required>
                      <option disabled value="">Select Additional Opt Out</option>
                      {
                        additionalOptOutCategories.map(function (additionalOptOutCategory) {
                          return <option key={additionalOptOutCategory.value} value={additionalOptOutCategory.value}>{additionalOptOutCategory.viewValue}</option>;
                        })
                      }
                    </select>
                    {formSubmitted && !additionalOptOut && <div className="invalid-feedback">Value is required.</div>}
                  </div>
                </>
              }
            </div>

            <div className="form-group row">
              <label htmlFor="oneClickProgramSelection1" className="col-sm-2 col-form-label text-info lb-md">Add One Click Enrollment?</label>
              <div className="col mt-2">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="oneClickProgramSelection" id="oneClickProgramSelection1"
                    className={'custom-control-input' + (formSubmitted && (oneClickProgramSelection !== true && oneClickProgramSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={oneClickProgramSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="oneClickProgramSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="oneClickProgramSelection" id="oneClickProgramSelection2"
                    className={'custom-control-input' + (formSubmitted && (oneClickProgramSelection !== true && oneClickProgramSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={oneClickProgramSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="oneClickProgramSelection2">No</label>
                </div>
                {formSubmitted && (oneClickProgramSelection !== true && oneClickProgramSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
            </div>

            {oneClickProgramSelection &&
              <div className="form-group row">
                <label htmlFor="oneclickProgram" className="col-sm-2 col-form-label text-info lb-md">One Click Enrollment Program Type</label>
                <div className="col">
                  {oneClickProgramTypes.map((oneClickProgramType) => {
                    return <div className="custom-control custom-radio custom-control-inline" key={oneClickProgramType.id}>
                      <input type="radio" name="oneclickProgram" id={oneClickProgramType.name}
                        className={'custom-control-input' + (formSubmitted && !oneclickProgram ? ' is-invalid' : '')}
                        value={oneClickProgramType.name} checked={oneclickProgram === oneClickProgramType.name} onChange={this.handleChange} />
                      <label className="custom-control-label text-muted" htmlFor={oneClickProgramType.name}>{oneClickProgramType.name}</label>
                    </div>
                  })
                  }
                  {formSubmitted && !oneclickProgram && <div className="invalid-feedback d-block">Selection is required.</div>}
                </div>
              </div>
            }

            <div className="form-group row">
              <label htmlFor="edisTemplateSelection1" className="col-sm-2 col-form-label text-info lb-md">Add Dynamic Integration With EDIS?</label>
              <div className="col mt-3">
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="edisTemplateSelection" id="edisTemplateSelection1"
                    className={'custom-control-input' + (formSubmitted && (edisTemplateSelection !== true && edisTemplateSelection !== false) ? ' is-invalid' : '')}
                    value="true" checked={edisTemplateSelection === true} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="edisTemplateSelection1">Yes</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" name="edisTemplateSelection" id="edisTemplateSelection2"
                    className={'custom-control-input' + (formSubmitted && (edisTemplateSelection !== true && edisTemplateSelection !== false) ? ' is-invalid' : '')}
                    value="false" checked={edisTemplateSelection === false} onChange={this.handleChange} />
                  <label className="custom-control-label text-muted" htmlFor="edisTemplateSelection2">No</label>
                </div>
                {formSubmitted && (edisTemplateSelection !== true && edisTemplateSelection !== false) &&
                  <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
            </div>

            {edisTemplateSelection &&
              <div className="form-group row">
                <label htmlFor="edisTemplateName" className="col-sm-2 col-form-label text-info lb-md">EDIS Template Name:</label>
                <div className={'col' + (formSubmitted && !edisTemplateName ? ' was-validated' : '')}>
                  <select name="edisTemplateName" id="edisTemplateName" className="custom-select text-muted"
                    value={edisTemplateName} onChange={this.handleChange} required>
                    <option disabled value="">Select EDIS Template</option>
                    {
                      edisTemplates.map(function (edisTemplate) {
                        return <option key={edisTemplate.id} value={edisTemplate.name}>{edisTemplate.name}</option>;
                      })
                    }
                  </select>
                  {formSubmitted && !edisTemplateName && <div className="invalid-feedback">Selection is required.</div>}
                </div>
                <label htmlFor="edisTemplateDescription" className="col-sm-1 col-form-label text-info lb-md px-0 mx-0">Template Description:</label>
                <div className={'col-sm-4 px-0 mx-0' + (formSubmitted && !edisTemplateDescription ? ' was-validated' : '')}>
                  <input type="text" readOnly style={{ outline: 'none' }} name="edisTemplateDescription" id="edisTemplateDescription"
                    className="form-control-plaintext text-muted" placeholder=""
                    value={edisTemplateDescription} onChange={this.handleChange} required />
                  {formSubmitted && !edisTemplateDescription && <div className="invalid-feedback">Value is required.</div>}
                </div>
                <label htmlFor="edisTemplateLink" className="col-sm-1 col-form-label text-info lb-md px-0 mx-0">Template Link:</label>
                <div className="col-sm-2 px-0 mx-0">
                  {edisTemplateLink && <a href={'https://reactjs.org/docs/forms.html#' + edisTemplateLink} className="form-control-plaintext text-primary mx-0"
                    target="_blank">{edisTemplateLink}</a>}
                </div>
              </div>
            }

            <div className="form-group row">
              <label htmlFor="campaignMetrics" className="col-sm-2 col-form-label text-info lb-md">Campaign metrics:</label>
              <div className={'col' + (formSubmitted && !campaignMetrics ? ' was-validated' : '')}>
                <textarea name="campaignMetrics" id="campaignMetrics" className="form-control" rows="3"
                  placeholder="Previous metrics including conversion data" value={campaignMetrics} onChange={this.handleChange} required />
                {formSubmitted && !campaignMetrics && <div className="invalid-feedback">Value is required.</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="cardProducts" className="col-sm-2 col-form-label text-info lb-md">Card product categories:</label>
              <div className="col mt-2">
                {cardProductTypes.map((cardProduct) => {
                  return <div className="custom-control custom-checkbox custom-control-inline" key={cardProduct.id}>
                    <input type="checkbox" name="cardProducts" id={cardProduct.name}
                      className={'custom-control-input' + (formSubmitted && cardProducts.length < 1 ? ' is-invalid' : '')}
                      checked={cardProducts.includes(cardProduct.name)} onChange={this.handleChange} />
                    <label className="custom-control-label text-muted" htmlFor={cardProduct.name}>{cardProduct.name}</label>
                  </div>
                })
                }
                {formSubmitted && cardProducts.length < 1 && <div className="invalid-feedback d-block">Selection is required.</div>}
              </div>
            </div>

          </div >
        </div >
      </>
    );
  }
}

export default Description;