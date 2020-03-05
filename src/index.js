import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Margin } from './style';

class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value.toUpperCase() });
	}

	handleSubmit(event) {
		console.log('Отправленное имя: ' + this.state.value);
		event.preventDefault();
		this.setState({ value: '' });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Имя:
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Отправить" />
			</form>
		);
	}
}
class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Будьте любезны, напишите сочинение о вашем любимом DOM-элементе.'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleSubmit(event) {
		alert('Сочинение отправлено:' + this.state.value);
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={(this, this.handleSubmit)}>
				<label>
					Сочинение:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
			</form>
		);
	}
}
class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 'coconut' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		alert('Ваш любимый вкус: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Выберите ваш любимый вкус:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Грейпфрут</option>
						<option value="lime">Лайм</option>
						<option value="coconut">Кокос</option>
						<option value="mango">Манго</option>
					</select>
				</label>
				<input type="submit" value="Отправить" />
			</form>
		);
	}
}
class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checke : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form>
				<label>
					Пойду:
					<input
						name="isGoing"
						type="checkbox"
						checke={this.state.isGoing}
						onChange={this.handleInputChange}
					/>
				</label>
				<br />
				<label>
					Количество гостей:
					<input
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange}
					/>
				</label>
			</form>
		);
	}
}
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>Вода закипит.</p>;
	}
	return <p>Вода не закипит.</p>;
}

const scaleNames = {
	c: 'Цельсия',
	f: 'Фаренгейта'
};
function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}
function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return celsius * 9 / 5 + 32;
}
class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = { temperature: '' };
	}
	handleCelsiusChange(temperature) {
		this.setState({ scale: 'c', temperature });
	}

	handleFahrenheitChange(temperature) {
		this.setState({ scale: 'f', temperature });
	}
	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput
					scale="f"
					temperature={fahrenheit}
					onTemperatureChange={this.handleFahrenheitChange}
				/>
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
}
/* function FancyBorder(props) {
	return (
	<div className={'FancyBorder' + props.color}>{props.right}{props.left}</div>)
}
function WelcomeDialog (){
	return (
		<Dialog title="Props" message='sds'/>
	)
} 
function Dialog(props) {
	return (
	<FancyBorder color="blue" right={<h1 className='dialog-title'>{props.title}</h1>} left={<p className='Dialog-message'>{props.message}</p>}/>
	)
} */

function FancyBorder(props) {
	return (
	  <div className={'FancyBorder FancyBorder-' + props.color}>
		{props.children}
	  </div>
	);
  }
  
  function Dialog(props) {
	return (
	  <FancyBorder color="blue">
		<h1 className="Dialog-title">
		  {props.title}
		</h1>
		<p className="Dialog-message">
		  {props.message}
		</p>
		{props.children}
	  </FancyBorder>
	);
  }
  class SignUpDialog extends React.Component {
	  constructor(props) {
		  super(props);
		  this.handleChange=this.handleChange.bind(this);
		  this.handleSignUp=this.handleSignUp.bind(this);
		  this.state = {login : ''}
	  }
	  render(){
		if (process.env.NODE_ENV === 'development') {
			const whyDidYouRender = require('@welldone-software/why-did-you-render');
			whyDidYouRender(React, {
			  trackAllPureComponents: true,
			});
		  }
		  return (
			  
		  <Dialog title = 'Программа исследования Марса' message = 'Как к вам обращаться?' >
			<input value ={this.state.login} onChange={this.handleChange}/>
			<button onClick = {this.handleSignUp}>Запиши меня</button></Dialog>
	)}
  
  handleChange(e){
	  this.setState({login : e.target.value});
  }
  handleSignUp () {
	  alert (`Добро пожаловать на борт, ${this.state.login}!`)
  }
}

ReactDOM.render(
	<Container>
		<Margin>
			<NameForm />
		</Margin>
		<Margin>
			<EssayForm />
		</Margin>
		<Margin>
			<FlavorForm />
		</Margin>
		<Margin>
			<Reservation />
		</Margin>
		<Margin>
			<Calculator />
		</Margin>
		<Margin>
			<SignUpDialog />
		</Margin>
		
	</Container>,
	document.getElementById('root')
);
