import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';
import EventForm from './EventForm';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Event from './Event';
import { Switch } from 'react-router-dom';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };

    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch((error) => {
          throw error
      });
  }

  addEvent(newEvent) {
    axios
      .post('http://localhost:3000/api/events.json', newEvent)
      .then((response) => {
        alert('Event Added!');
        const savedEvent = response.data;
        this.setState(prevState => ({
          events: [...prevState.events, savedEvent],
        }));
        const { history } = this.props;
        history.push(`/events/${savedEvent.id}`);
      })
      .catch((error) => {
        throw error
      });
  }
  

  deleteEvent(eventId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`http://localhost:3000/api/events/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            alert('Event deleted');
            const { history } = this.props;
            history.push('/events');

            const { events } = this.state;
            this.setState({ events: events.filter(event => event.id !== eventId) });
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  updateEvent(updatedEvent) {
    axios
      .put(`http://localhost:3000/api/events/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        alert('Event updated');
        const { events } = this.state;
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;
        const { history } = this.props;
        history.push(`/events/${updatedEvent.id}`);
        this.setState({ events });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    const { events } = this.state;
    if (events === null) return null;

    const { match } = this.props;
    const eventId = match.params.id;
    const event = events.find(e => e.id === Number(eventId));

    return (
      <div>
        <Header />
        <div className="grid">
          <EventList events={events} activeId={Number(eventId)} />
          <Switch>

            <PropsRoute path="/events/new" 
            component={EventForm} 
            onSubmit={this.addEvent} 
            />
            <PropsRoute path="/events/:id/edit"
              component={EventForm}
              event={event}
              onSubmit={this.updateEvent}
            />  
            <PropsRoute 
            path="/events/:id" 
            component={Event} 
            event={event}
            onDelete={this.deleteEvent}
            /> 
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;