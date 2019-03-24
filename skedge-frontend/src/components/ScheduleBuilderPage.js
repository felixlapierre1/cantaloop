import React, { Component } from 'react';
import '../styles/ScheduleBuilderPage.css';
import Schedule from './Schedule';
import HeaderPage from './HeaderPage.js';
import TabContent from './TabContent.js';
import { Icon, Menu, Segment, Sidebar, Tab } from 'semantic-ui-react';

//The main page after a user logs in
class ScheduleBuilderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {visible: false};
    this.handleHamburgerButton = this.handleHamburgerButton.bind(this);
  }

  handleHamburgerButton(){
      this.setState((state) => {
        return {visible: !this.state.visible};
      });
    console.log(this.state.visible);
  }

  componentWillMount(){
    this.panes = [];
    var years = {};
    this.props.scheduleGiven.forEach(element => {
      var year = element.year;
      var season = element.season;
      if(years[year] === undefined)
        years[year] = {};
      years[year][season] = element.schedules;
    });
    for(var yearKey in years){
      var scheduleComponents = [];
      for(var seasonKey in years[yearKey]){
        scheduleComponents.push(<Schedule key={seasonKey} season={seasonKey} schedules={years[yearKey][seasonKey]} />);
      }
      this.panes.push({
        menuItem: yearKey,
        render: () => <TabContent scheduleComponents={scheduleComponents} scheduleGiven={this.props.scheduleGiven}/>
      })
    }
  }

  render() {
    return (
      <div>
        <HeaderPage />
        <div>
          <Icon id='hamburgerButton' name='bars' size='big' onClick={this.handleHamburgerButton} />
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={this.state.visible}
            >
              <Menu.Item as='a'>Hamburger</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <Tab panes={this.panes} />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default ScheduleBuilderPage;
