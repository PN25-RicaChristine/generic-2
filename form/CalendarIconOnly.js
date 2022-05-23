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
        this.props.onChange(e, null)
		// if(e){
		// 	const year = e.getFullYear()
		// 	const date = e.getDate()
		// 	const month = this.getMonthEquivalent(e.getMonth())
		// 	const valueLabel = month + ' ' + date + ', ' + year
		// 	this.props.onChange(e, valueLabel)
		// }
	}

	render() {
		const { show, value, valueLabel } = this.state;
		return (
			<div style={{
                position: 'relative'
			}}>
				<div style={{
                    float: 'right'
				}}
					className="cursor-hover"
					onClick={() => {
						this.setState({
							show: !show
						})
					}}
				>
					<span style={{
					}}>
						<FontAwesomeIcon icon={faCalendar} size="lg" />
					</span>

				</div>
				{
					show && (
						<div style={{
							position: 'absolute',
                            right: 0,
                            marginTop: 40
						}}>
							<Calendar
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
