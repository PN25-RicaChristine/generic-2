import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Colors from 'common/Colors'
export default function Stack(props) {

    console.log({
        data: props.data
    })
    return (
        <Autocomplete
            multiple
            options={props.data}
            id="tags-standard"
            sx={{
                width: '100%',
                float: 'left',
                border: 'none',
                borderBottom: 'solid 2px ' + Colors.gray
            }}
            defaultValue={[props.data[0]]}
            isOptionEqualToValue={(option, value) => option.title}
            getOptionLabel={(option) => option.title}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={props.label}
                    variant="standard"
                    placeholder={props.label}
                />
            }
        />
    );
}


