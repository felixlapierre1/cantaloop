import React, { Component } from 'react';
import { Button, Input, Radio } from 'semantic-ui-react';
import '../styles/SemesterItems.css';

//blob that has a name and class code
class SemesterItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : "",
      semester : "",
      numCredits : "",
      numCourses : "",
      currentSemester : {year: "", semester: "", numCredits: "", numCourses: ""},
      semesters : []
    }
    this.handleAddSemester = this.handleAddSemester.bind(this);
    this.handleSemesterYearChange = this.handleSemesterYearChange.bind(this);
    this.handleSemesterSeasonChange = this.handleSemesterSeasonChange.bind(this);
    this.handleSemesterCreditsChange = this.handleSemesterCreditsChange.bind(this);
    this.handleRemoveSemester = this.handleRemoveSemester.bind(this);
    this.handleCheckState = this.handleCheckState.bind(this);
  }

  handleSemesterYearChange(index, event) {
    var newSemesters = this.state.semesters;
    newSemesters[index].year = event.target.value;
    this.setState({
        semesters: newSemesters
    })
  }

  handleSemesterSeasonChange(index, event){
    console.log("season change");
    var newSemesters = this.state.semesters;
    newSemesters[index].season = event.target.innerText;
    this.setState({
      semesters: newSemesters
    })
  }

  handleSemesterCreditsChange(index, event){
    var newSemesters = this.state.semesters;
    newSemesters[index].credits = event.target.value;
    this.setState({
        semesters: newSemesters
    })
  }

  handleSemesterNumCoursesChange(index, event) {
    var newSemesters = this.state.semesters;
    newSemesters[index].numCourses = event.target.value;
    this.setState({
        semesters: newSemesters
    })
  }

  handleRemoveSemester(index) {
    console.log(index + " remove");
    var newSemesters = [];
    for(var i = 0; i < this.state.semesters.length; i++){
      console.log("i = " + i + " and index = " + index + " and value = " + this.state.semesters[i]);
      if(i !== index){
        newSemesters.push(this.state.semesters[i])
      }
    }
    console.log(newSemesters);
    this.setState ({
      semesters: newSemesters
    })
  }


  handleAddSemester(event){
    event.preventDefault();
    console.log("add semester");
    const newSemesters = this.state.semesters.concat([{ year: '2019', season: 'Fall', credits: '15', numCourses: '5', restrictions: []}])
    this.setState({
      semesters: newSemesters
    });
    console.log(this.state.semesters);
  }

  handleCheckState(event){
    event.preventDefault();
    console.log(this.state.semesters);
  }

  render() {
    return (
      <form>
      {this.state.semesters.map((semester, index) => (
            <div className="semesterObject" key={index}>
            <Radio
            label='Fall'
            name={"group" + index.toString()}
            value='Fall'
            checked={semester.season === 'Fall'}
            onChange={this.handleSemesterSeasonChange.bind(this, index)}
            />
            <br/>
            <Radio
            label='Winter'
            name={"group" + index.toString()}
            value='Winter'
            checked={semester.season === 'Winter'}
            onChange={this.handleSemesterSeasonChange.bind(this, index)}
            />
            <br/>
            <Radio
            label='Summer'
            name={"group" + index.toString()}
            value='Summer'
            checked={semester.season === 'Summer'}
            onChange={this.handleSemesterSeasonChange.bind(this, index)}
            />
            <br/>
            <Input placeholder={`Year`}
            type='number'
            value={semester.year}
            onChange={this.handleSemesterYearChange.bind(this, index)}
            label="Year"
            />
            <br/>
            <br/>
            <Input
            placeholder={`Number of Credits`}
            type='number'
            value={semester.credits}
            onChange={this.handleSemesterCreditsChange.bind(this, index)}
            label="Credits"
            />
            <br/>
            <br/>
            <Input placeholder={`Number of Courses`}
            type='number'
            value={semester.numCourses}
            onChange={this.handleSemesterNumCoursesChange.bind(this, index)}
            label="Courses"
            />
            <br/>
            <Button type="button" onClick={this.handleRemoveSemester.bind(this, index)}>
              -
            </Button>
          </div>
        ))}

        <Button onClick={this.handleAddSemester}>Add Semester</Button>
        <br/>
        <Button onClick={this.handleCheckState}>Check Semesters Object!</Button>

      </form>
    );
  }
}


export default SemesterItems;
