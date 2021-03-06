const React             = require('react');
const GroupActions      = require('../actions/group_actions');
const GroupStore        = require('../stores/group_store');
const SessionStore      = require('../stores/session_store');
const ErrorStore        = require('../stores/error_store');
const ReactRouter       = require('react-router');
const hashHistory       = ReactRouter.hashHistory;
const MembershipActions = require('../actions/membership_actions');

let cityError             = "";
let cityErrorClass        = "";
let stateError            = "";
let titleError            = "";
let titleErrorClass       = "";
let descriptionError      = "";
let descriptionErrorClass = "";

const CreateGroup = React.createClass({
  getInitialState() {
    return({
      city         : "",
      state        : "",
      title        : "",
      description  : "",
      lat          : "",
      lng          : "",
      imageUrl     : "",
      imageFile    : "",
      moderator_id : SessionStore.currentUser().user.id,
      errors       : []
    });
  },
  componentDidMount() {
    this.listener = ErrorStore.addListener(this._onErrorChange);
    this.groupListener = GroupStore.addListener(this._onGroupChange);
  },
  componentWillMount() {
    jQuery('body').addClass('white-background');
  },
  componentWillUnmount() {
    this.listener.remove();
    this.groupListener.remove();
    jQuery('body').removeClass('white-background');
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("CreateGroup")});
  },
  _onGroupChange() {
    let group = GroupStore.all();
    group = GroupStore.all()[group.length - 1];
    let data = {
      membership: {
        group_id  : group.group.id,
        member_id : this.state.moderator_id
      }
    };
    MembershipActions.joinGroup(data);
    hashHistory.replace(`groups/${group.group.id}`);
  },
  _showStepTwo(e) {
    e.preventDefault();
    jQuery(e.target).addClass('hide');
    jQuery('.form-group-two').removeClass('hide');
  },
  _showStepThree(e) {
    e.preventDefault();
    jQuery(e.target).addClass('hide');
    jQuery('.form-group-three').removeClass('hide');
  },
  _createGroup(e) {

    e.preventDefault();
    const group = {
      city         : this.state.city,
      state        : this.state.state,
    };
    
    let formData = new FormData();
    formData.append("group[city]", this.state.city);
    formData.append("group[state]", this.state.state);
    formData.append("group[title]", this.state.title);
    formData.append("group[moderator_id]", this.state.moderator_id);
    formData.append("group[description]", this.state.description);
    formData.append("group[image]", this.state.imageFile);

    $.ajax({
      url    : `https://maps.googleapis.com/maps/api/geocode/json?address=${group.city},${group.state}&region=us&key=AIzaSyC7mHejYETsrCCXPm_ncRFkfAVxuAOS7yM`,
      method : "GET",
      success(dat1) {
        if (group.city !== "" && group.state !== "") {
          formData.append("group[lat]", dat1.results[0].geometry.location.lat);
          formData.append("group[lng]", dat1.results[0].geometry.location.lng);
        }
        GroupActions.createGroup(formData);
      }
    });

    cityError             = "";
    cityErrorClass        = "";
    stateError            = "";
    titleError            = "";
    titleErrorClass       = "";
    descriptionError      = "";
    descriptionErrorClass = "";

    if (this.state.city === "") {
      cityError      = "Please provide a city.";
      cityErrorClass = "error-input";
    }
    if (this.state.state === "" || this.state.state === "--Select--") {
      stateError = "Please select a state";
    }
    if (this.state.title === "") {
      titleError      = "Please give your Meetup a name";
      titleErrorClass = "error-input";
    }
    if (this.state.description === "") {
      descriptionError      = "Please provide a description of your Meetup.";
      descriptionErrorClass = "error-input";
    }
  },
  _updateCity(e) {
    this.setState({ city: e.target.value });
  },
  _updateState(e) {
    this.setState({ state: e.target.value });
  },
  _updateTitle(e) {
    this.setState({ title: e.target.value });
  },
  _updateDescription(e) {
    this.setState({ description: e.target.value });
  },
  _goToIndex() {
    hashHistory.replace("/");
  },
  _updateFile(e) {

    let reader = new FileReader();
    let file   = e.currentTarget.files[0];
    reader.onloadend = function () {
      this.setState({
        imageUrl  : reader.result,
        imageFile : file
      });

    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        imageUrl  : "",
        imageFile : ""
      });
    }

  },
  render() {
    return(
      <div>
        <div className="group-hero-form">
          <div className="logo" onClick={this._goToIndex}></div>
          <h1>Start your own Meetup</h1>
          <p>We&#39;ll help you find the right people to make it happen. Most Meetups <br /> start getting members within the first few days.</p>
        </div>
        <form className="form form-group">
          <div className="form-group-one">
            <label>
              <p>Step 1 of 3</p>
              <h2>What&#39;s your new Meetup Group&#39;s hometown?</h2>
              <input type="text" name="city" defaultValue="" placeholder="City" onChange={this._updateCity} className={cityErrorClass}/>
              <p className="error">{cityError}</p>
              <select name="state" defaultValue="--State--" onChange={this._updateState}>
                <option disabled>--State--</option>
              	<option defaultValue="AL">AL</option>
              	<option defaultValue="AK">AK</option>
              	<option defaultValue="AZ">AZ</option>
              	<option defaultValue="AR">AR</option>
              	<option defaultValue="CA">CA</option>
              	<option defaultValue="CO">CO</option>
              	<option defaultValue="CT">CT</option>
              	<option defaultValue="DE">DE</option>
              	<option defaultValue="DC">DC</option>
              	<option defaultValue="FL">FL</option>
              	<option defaultValue="GA">GA</option>
              	<option defaultValue="HI">HI</option>
              	<option defaultValue="ID">ID</option>
              	<option defaultValue="IL">IL</option>
              	<option defaultValue="IN">IN</option>
              	<option defaultValue="IA">IA</option>
              	<option defaultValue="KS">KS</option>
              	<option defaultValue="KY">KY</option>
              	<option defaultValue="LA">LA</option>
              	<option defaultValue="ME">ME</option>
              	<option defaultValue="MD">MD</option>
              	<option defaultValue="MA">MA</option>
              	<option defaultValue="MI">MI</option>
              	<option defaultValue="MN">MN</option>
              	<option defaultValue="MS">MS</option>
              	<option defaultValue="MO">MO</option>
              	<option defaultValue="MT">MT</option>
              	<option defaultValue="NE">NE</option>
              	<option defaultValue="NV">NV</option>
              	<option defaultValue="NH">NH</option>
              	<option defaultValue="NJ">NJ</option>
              	<option defaultValue="NM">NM</option>
              	<option defaultValue="NY">NY</option>
              	<option defaultValue="NC">NC</option>
              	<option defaultValue="ND">ND</option>
              	<option defaultValue="OH">OH</option>
              	<option defaultValue="OK">OK</option>
              	<option defaultValue="OR">OR</option>
              	<option defaultValue="PA">PA</option>
              	<option defaultValue="RI">RI</option>
              	<option defaultValue="SC">SC</option>
              	<option defaultValue="SD">SD</option>
              	<option defaultValue="TN">TN</option>
              	<option defaultValue="TX">TX</option>
              	<option defaultValue="UT">UT</option>
              	<option defaultValue="VT">VT</option>
              	<option defaultValue="VA">VA</option>
              	<option defaultValue="WA">WA</option>
              	<option defaultValue="WV">WV</option>
              	<option defaultValue="WI">WI</option>
              	<option defaultValue="WY">WY</option>
              </select>
            </label>
            <button onClick={this._showStepTwo}>Next</button>
          </div>
          <div className="form-group-two hide">
            <label>
              <p>Step 2 of 3</p>
              <h2>What will your Meetup&#39;s name be?</h2>
              <input type="text" name="title" defaultValue="" onChange={this._updateTitle} className={titleErrorClass}/>
              <p className="error">{titleError}</p>
              <h2>Choose an image for your group</h2>
              <input type="file" onChange={this._updateFile} />
              <img src={this.state.imageUrl} />
              <h2>Describe who should join, and what your Meetup will do.</h2>
              <textarea name="description" onChange={this._updateDescription} className={descriptionErrorClass}></textarea>
              <p className="error">{descriptionError}</p>
            </label>
            <button onClick={this._showStepThree}>Next</button>
          </div>
          <div className="form-group-three hide">
            <p>Step 3 of 3</p>
            <h2>What it means to be a Meetup</h2>
            <ul>
              <li>Real, in-person conversations</li>
              <li>Open and honest intentions</li>
              <li>Always safe and respectful</li>
              <li>Put your members first</li>
            </ul>
            <button onClick={this._createGroup}>Agree &amp; Continue</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = CreateGroup;
