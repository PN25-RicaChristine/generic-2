import React from 'react';
import { BasicStyles } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSpinner } from '@fortawesome/free-solid-svg-icons'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

export default class Stack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	getMonthEquivalent(month) {
		switch (month) {
			case 0: return 'January'
			case 1: return 'Febuary'
			case 2: return 'March'
			case 3: return 'April'
			case 4: return 'May'
			case 5: return 'June'
			case 6: return 'July'
			case 7: return 'August'
			case 8: return 'September'
			case 9: return 'October'
			case 10: return 'November'
			case 11: return 'December'
		}
	}
	onChange = (e) => {
		if(e.length > 0 && e[1] != undefined){
			const year = e[0].getFullYear()
			const date = e[0].getDate()
			const month = this.getMonthEquivalent(e[0].getMonth())
			const year1 = e[1].getFullYear()
			const date1 = e[1].getDate()
			const month1 = this.getMonthEquivalent(e[1].getMonth())
			const valueLabel = month + ' ' + date + ', ' + year + ' - ' + month1 + ' ' + date1 + ', ' + year1
			this.props.onChange(e, valueLabel)
		}
	}

	render() {
		const { show, value, valueLabel } = this.state;
		return (
			<div style={{
				width: '100%',
				float: 'left',
				...BasicStyles.formControlContainer
			}}>
				<div style={{
					...BasicStyles.formControl,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
					className="cursor-hover"
					onClick={() => {
						this.setState({
							show: !show
						})
					}}
				>
					<span>{this.props.valueLabel ? this.props.valueLabel : this.props.placeholder}</span>
					<span style={{
						paddingLeft: '60%'
					}}>
						<FontAwesomeIcon icon={faCalendar} size="lg" />
					</span>
					{
						this.props.iconRight && (
							<span style={{
								width: '15%',
								float: 'left',
								display: 'flex',
								justifyContent: 'right',
								alignItems: 'center',
								height: 50
							}}
								className="href-link"
								onClick={() => {
									this.props.onClickRightIcon()
								}}
							>
								<FontAwesomeIcon icon={this.props.iconRight} color={this.props.iconStyle != null ? this.props.iconStyle : 'black'} size="lg" />
							</span>
						)
					}

				</div>
				{
					show && (
						<div style={{
							position: 'absolute'
						}}>
							<Calendar
								selectRange={true}
								allowPartialRange={true}
								onChange={this.onChange}
								value={this.state.value}
								minDate={this.props.minDates != undefined ? this.props.minDates : new Date()}
							/>
						</div>
					)
				}
			</div>
		)
	}
}
