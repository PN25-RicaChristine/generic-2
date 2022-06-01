import React from 'react';
import 'react-phone-number-input/style.css'
import './PhoneNumber.css'
import PhoneInput from 'react-phone-number-input'
import { BasicStyles } from 'common';
export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (value) => {
        this.props.onChange(value)
    }

    render() {
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                {
                    this.props.label && (
                        <label style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontWeight: 'bold'
                        }}>{this.props.label}</label>
                    )
                }
                <div style={{
                    width: '100%',
                    float: 'left'
                }}>
                    <PhoneInput
                        country={this.props.defaultCountry}
                        defaultCountry={this.props.defaultCountry}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        style={BasicStyles.formControl}
                        onChange={this.onChange} />
                </div>

            </div>
        )
    }
}
