import React, {useEffect, useState, useRef} from 'react';
import {InputLabel, OutlinedInput, Select, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';

const handleSelect = (callback) => event => callback(event.target.value);

const OutlinedSelect = (props) => {
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, []);

    return (
        <React.Fragment>
            <InputLabel ref={inputLabel} htmlFor={props.selectId} {...props.inputProps}>{props.labelText}</InputLabel>
            <Select
                native
                value={props.value}
                onChange={handleSelect(props.setState)}
                input={
                    <OutlinedInput
                        labelWidth={labelWidth}
                        name={props.selectName}
                        id={props.selectId}
                    />
                }
                disabled={props.disabled || false}
                {...props.selectProps}
            >
                {props.children}
            </Select>
        </React.Fragment>
    )
};

OutlinedSelect.propTypes = {
    children: PropTypes.node.isRequired,
    selectName: PropTypes.string.isRequired,
    selectId: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    value: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
    selectProps: PropTypes.object,
    inputProps: PropTypes.object,
    disabled: PropTypes.bool
};

const CustomOutlinedInput = (props) => {
    return (
        <TextField
            id={props.id || `input-${props.label}`}
            name={props.name}
            value={props.value}
            label={props.label}
            type={props.type || 'text'}
            margin="normal"
            variant="outlined"
            fullWidth
            autoComplete={props.autocomplete || false}
            onChange={(event) => props.onChange(event.target.value)}
            {...props}
        />
    )
};

CustomOutlinedInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autocomplete: PropTypes.bool,
    id: PropTypes.string,
    type: PropTypes.string
};

export {OutlinedSelect, CustomOutlinedInput}