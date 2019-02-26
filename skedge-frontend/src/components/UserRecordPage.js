import React, { Component } from 'react';
import '../styles/UserRecordPage.css';
import { Dropdown, Button } from 'semantic-ui-react'

const courseOptions = [
  {
    key: 'COMP 232',
    value: 'Math for CompSci',
    text: 'Math for CompSci'
  },
  {
    key: 'COMP 248',
    value: 'OOP 1',
    text: 'OOP 1'
  },
  {
    key: 'ENGR 202',
    value: 'Prof. Practice and Responsibility',
    text: 'Prof. Practice and Responsibility'
  },
  {
    key: 'ENGR 213',
    value: 'ODE 1',
    text: 'ODE 1'
  },
  {
    key: 'ENGR 251',
    value: 'Thermodynamics',
    text: 'Thermodynamics'
  },
  {
    key: 'COMP 249',
    value: 'OOP 2',
    text: 'OOP 2'
  },
  {
    key: 'ENGR 233',
    value: 'ODE 2',
    text: 'ODE 2'
  },
  {
    key: 'SOEN 228',
    value: 'Hardware',
    text: 'Hardware'
  },
  {
    key: 'SOEN 287',
    value: 'Web Programming',
    text: 'Web Programming'
  },
  {
    key: 'PHYS 252',
    value: 'Waves and Optics',
    text: 'Waves and Optics'
  }
]

//The page where the user can change its record etc.
class UserRecordPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log("hello");
  }

  render() {
    return (
      <div id = "outer">
        <h3 id = "welcome-title" >
          Hi! Welcome to Skedge
        </h3>
        <div id = "recordCcoursesDropdown">
          <h5>
            What classes have you taken?
          </h5>
          <Dropdown
          onClick = {this.handleClick}
          placeholder = 'Select Course'
          fluid
          search
          selection
          options = {courseOptions}
          />
        </div>
        <div id = "wantedCoursesDropdown">
          <h5>
            What classes would you like to take?
          </h5>
          <Dropdown
          placeholder = 'Select Course'
          fluid
          search
          selection
          options = {courseOptions}
          />
        </div>
      </div>
    );
  }
}

export default UserRecordPage;
