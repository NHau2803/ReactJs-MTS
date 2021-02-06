import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, makeStyles, } from '@material-ui/core';
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
   
    
}));

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
]

const initialFValuesDefault = {
    id: 0,
    code: '',
    name: '',
    gender: 'male',
    birthday: new Date('2001-01-01T12:00:00'),
    tickDefaultEmail: true,
    email: '',
    phone: '',
    academyId: '',
    positionId: '',
    facultyId: '',
    username: '',
    tickDefaultUsername: true,
    password: '',
    tickDefaultPassword: true
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
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('academyId' in fieldValues)
        temp.academyId = fieldValues.academyId.length !== 0 ? "" : "This field is required."
        if ('positionId' in fieldValues)
        temp.positionId = fieldValues.positionId.length !== 0 ? "" : "This field is required."
        if ('facultyId' in fieldValues)
            temp.facultyId = fieldValues.facultyId.length !== 0 ? "" : "This field is required."
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? (fieldValues.password.length > 8 ? "" : "Password must be geater than 8") : "This field is required"

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
            gender: values.gender.toUpperCase(),
            birthday:values.birthday.toISOString(),
            email: values.email,
            phone: values.phone,
            academyId: Number(values.academyId),
            position: Number(values.positionId),
            facultyId: Number(values.facultyId),
            username: values.username,
            password: values.password,
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
                ? <h1>Create a Teacher</h1>
                : <h1>Update Teacher</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
            
                <Grid item xs={12} sm={3} className={classes.gridLeft}>
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
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <br/>
                    <DatePicker
                        name="birthday"
                        label="Birthday"
                        value={values.birthday}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Input
                        name="phone"
                        label="Phone"
                        placeholder="Ex: 0946111222"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <br/>
                    <Select
                        name="positionId"
                        label="Position"
                        value={values.positionId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.facultyId}
                    />
                    </FormGroup>

                </Grid>
                <Grid item xs={12} sm={3} className={classes.gridRight}>
                    <FormGroup>
                    <Select
                        name="academyId"
                        label="Academy"
                        value={values.academyId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.facultyId}
                    />
                    <br/>
                    <Select
                        name="facultyId"
                        label="Faculty"
                        value={values.facultyId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.facultyId}
                    />
                    <br/>
                    <Input
                        name="email"
                        label="Email"
                        placeholder="Ex: an.197CT11122@vanlanguni.vn"
                        value={values.tickDefaultEmail ? values.email = getNameFromFullName(values.name)+ "." + values.code + "@vanlanguni.vn" : values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={values.tickDefaultEmail}
                    />
                    <Checkbox
                        name="tickDefaultEmail"
                        label="Default"
                        value={values.tickDefaultEmail}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="username"
                        label="Username"
                        placeholder="Ex: an.197CT11122"
                        value={values.tickDefaultUsername ? values.username = getNameFromFullName(values.name)+ "." + values.code : values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={values.tickDefaultUsername}
                    />
                    <Checkbox 
                        name="tickDefaultUsername"
                        label="Default"
                        value={values.tickDefaultUsername}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={values.tickDefaultPassword ? values.password = values.code: values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        disabled={values.tickDefaultPassword}
                    
                    />
                    <Checkbox
                        name="tickDefaultPassword"
                        label="Default"
                        value={values.tickDefaultPassword}
                        onChange={handleInputChange}
                    />

                    {/* {isAddMode
                    ? "abc"
                    : <Select
                        name="facultyId"
                        label="Faculty"
                        value={values.facultyId}
                        onChange={handleInputChange}
                        options={FACULTY_LIST()}
                        error={errors.facultyId}
                        />
                    }   */}
                    </FormGroup>
                </Grid>
            
            </Grid>
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



