import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Colors from 'common/Colors'
export default function Stack(props) {
    return (
        <Autocomplete
            disablePortal
            options={props.data}
            sx={{
                width: '100%',
                float: 'left',
                border: 'none',
                borderBottom: 'solid 2px ' + Colors.gray
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    disableUnderline={true}
                    label={props.label}
                    variant="standard"
                    inputProps={{
                        underline: {
                            "&&&:before": {
                                borderBottom: "none"
                            },
                            "&&:after": {
                                borderBottom: "none"
                            }
                        }
                    }}

                />
            }
        />
    );
}


