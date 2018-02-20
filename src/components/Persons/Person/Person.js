import React, {Component} from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';

class Person extends Component {
	constructor(props) {
		super(props);
		console.log('Person.js inside constructor');
	  }
	
	componentWillMount() {
		console.log('Person.js insiede componentWillMount');
	
	  }
	
	componentDidMount() {
		console.log('Person.js inside componentDidMount');
		if (this.props.position === 0) this.inputElement.focus();
	  }
	render() {
		console.log('Person.js inside render');
		return (
			<Aux>
				<p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
				<p>{this.props.children}</p>
				<input 
					ref={(inp) => {this.inputElement = inp}} //ref wystepuje tylko w kompenentach stanowych [class], tworzymy nowe pole w klasie dajace dostep do elementu input spoza metody render
					type="text" 
					onChange={this.props.changed} 
					value={this.props.name} />
			</Aux>
			)
		}
}

Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func
};

export default withClass(Person, classes.Person);