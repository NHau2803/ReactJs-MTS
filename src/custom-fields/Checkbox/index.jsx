import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { SET_COLOR_PRIMARY } from 'constant/color';

export default function Checkbox(props) {

    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                label={label}

                control=
                {
                <MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => 
                        onChange(convertToDefEventPara(name, e.target.checked))
                    }
                    style={SET_COLOR_PRIMARY}
                />}
            />
        </FormControl>
    )
}