import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
      super(props);
      console.log('Persons.js inside constructor');
      }
    
    componentWillMount() {
      console.log('Persons.js insiede componentWillMount');
    
      }
    
    componentDidMount() {
      console.log('Persons.sjs inside componentDidMount')
      }

    componentWillReceiveProps(nextProps) {
      console.log('Persons.js iside componentWillReceiveProps');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('Persons.js inside shouldComponentUpdate', nextProps, nextState);
    //   return nextProps.persons !== this.props.persons;
    // }

    componentWillUpdate(nextProps, nextState) {
      console.log('Persons.js inside componentWillUpdate')
    }

    componentDidUpdate() {
      console.log('Persons.js inside componentDidUpdate')
    }

    render() {
      console.log('Persons.js inside render')
      return (
  		  this.props.persons.map((person, index)  => (
              	<Person
                        key={person.id}
                        changed={(event) => this.props.changed(event, person.id)}
                        name={person.name} 
                        age={person.age}
                        position={index}
                        click={() => this.props.click(index)}/>
              	)
          	)
      )
    }
}

export default Persons