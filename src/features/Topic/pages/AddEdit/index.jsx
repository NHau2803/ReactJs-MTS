import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, makeStyles, Paper, } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import RadioGroup from 'custom-fields/RadioGroup';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import { useForm } from 'custom-fields/Use/useForm';
import studentApi from 'api/studentApi';
import { FACULTY_LIST } from 'constant/dataDemo';
import { getNameFromFullName } from 'utils/converter';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'constant/color';
import Button from 'custom-fields/Button';
import Checkbox from 'custom-fields/Checkbox';
import DealinesTable from 'features/Topic/components/Deadline';




const useStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
   
    icon: {
        fontSize: theme.spacing(10),
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
    },
    gridLeft: {
        padding: theme.spacing(2),
    },
    gridRight: {
        padding: theme.spacing(2)
    },
    gridItem: {
        padding: theme.spacing(2),
    },
    formGroup: {
        margin: theme.spacing(1),
    },
    submit: {
        //background: "red",
    },
    // paper: {
    //     padding: theme.spacing(1),
    // }
   
    
}));


const initialFValuesDefault = {
    id: 0,
    code: '',
    name: '',
    startTime: new Date('2001-01-01T12:00:00'),
    endTime: new Date('2001-01-01T12:00:00'),
    typeTopicId: '',
}

export default function AddEditPage(props) {

    const classes = useStyles();

    const { studentId } = useParams();

  //  const [student, setStudent] = useState([]);

    const isAddMode = !studentId;


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('typeTopicId' in fieldValues)
        temp.typeTopicId = fieldValues.typeTopicId.length !== 0 ? "" : "This field is required."
        
        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValuesDefault, isAddMode, true, validate);

    const handleSubmit = e => {
        //add or update 
        e.preventDefault();
        const teacherObject = {
            code: values.code,
            name: values.name,
            startTime:values.startTime.toISOString(),
            endTime:values.endTime.toISOString(),
            typeTopicId: Number(values.typeTopicId)
        }

        if(isAddMode){
            
            console.log(teacherObject);
            //studentApi.create(teacherObject);
        }else{

            console.log(teacherObject);
           // studentApi.create(studentNew);
        }

    }
    return (
        <div className={classes.root}>
        <FormGroup onSubmit={handleSubmit}>
            <FormLabel>
                {isAddMode 
                ? <h1>Create a Topic</h1>
                : <h1>Update Topic</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>

                <Grid item xs={12} sm={3}>
                {/* <h3>Info</h3> */}

                    <FormGroup>
                    <Input
                        name="code"
                        label="Code"
                        placeholder="Ex: 197CT11122"
                        value={values.code}
                        onChange={handleInputChange}
                        error={errors.code}
                    />
                    <br/>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ex: Nguyễn Văn An"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <DatePicker
                        name="startTime"
                        label="Start Time"
                        value={values.startTime}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <DatePicker
                        name="endTime"
                        label="End Time"
                        value={values.endTime}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Select
                        nampe="typeTopicId"
                        label="Type Topic"
                        value={values.typeTopicId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.typeTopicId}
                    />
                    </FormGroup>


                </Grid>
             
            </Grid>



            {/* <DealinesTable /> */}

            <Grid item xs={12} className={classes.submit}>
                    <Button
                        type="submit"
                        text={isAddMode ? "Save": "Update"} 
                        startIcon={isAddMode ? <SaveIcon />: <UpdateIcon />}
                        onClick={handleSubmit}
                        background = {SET_BACKGROUND_COLOR_PRIMARY_DARK}
                    />
                    <Button
                    
                        text="Reset"
                        color="default"
                        startIcon={<RefreshIcon />}
                        onClick={resetForm} 
                    />
            </Grid>
            
            </FormGroup>
        </div>
    )
}



