import React from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
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
                <PhoneInput
                    country="US"
                    value={value}
                    onChange={setValue} />
            </div>
        )
    }
}
