import React from 'react'
import { useParams } from 'react-router-dom';
import { FormGroup, FormLabel, Grid, } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import Input from 'custom-fields/Input';
import RadioGroup from 'custom-fields/RadioGroup';
import DatePicker from 'custom-fields/DatePicker';
import Select from 'custom-fields/Select';
import { getNameFromFullName } from 'utils/converter';
import { SET_BACKGROUND_COLOR_PRIMARY_DARK } from 'styles/Color';
import Button from 'custom-fields/Button';
import Checkbox from 'custom-fields/Checkbox';
import FacultyListAPI from 'api/GetListForSelect/facultyList';
import Notification from 'custom-fields/Notification';
import { useFormCustom } from 'custom-fields/Use/useFormCustom';
import { initialValuesTeacherDefault, GENDER_LIST, LIST_DEFAULT } from 'constants/InitialValues';
import PositionListAPI from 'api/GetListForSelect/positionList';
import AcademyListAPI from 'api/GetListForSelect/academyList';
import teacherApi from 'api/Teacher';
import { TYPE } from 'constants/Type/type';
import { getTeacherCreateObject, getTeacherUpdateObject } from 'utils/getObject';
import { useFormStyles } from 'styles/Form';
import { checkValidation } from 'utils/validation';

export default function AddEditPage(props) {

    const classes = useFormStyles();
    const { teacherId } = useParams();
    const {history} = props;
    const isAddMode = !teacherId;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        temp = checkValidation(temp, fieldValues);
        setErrors({ ...temp })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        notify,
        setNotify,
        notFound,
        handleInputChange,
        onReset
    } = useFormCustom(initialValuesTeacherDefault , isAddMode, TYPE.TEACHER, teacherId, true, validate);

    const handleSubmit = e => {
        //add or update 
        e.preventDefault();
        
        if(isAddMode){
            const teacherCreate = getTeacherCreateObject(values);
            teacherApi.create(teacherCreate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Create Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/teacher'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sorry, Create Unsuccessfully",
                        type: "error"
                    });
                }
            });

        }else{
            const teacherUpdate = getTeacherUpdateObject(values);
            teacherApi.update(teacherId, teacherUpdate).then(res=>{
                if(res.success){
                    setNotify({
                        isOpen: true,
                        message: "Update Successfully",
                        type: "success"
                    });
                    setTimeout(() => history.push('/admin/teacher'), 1500);
                    
                }else{
                    setNotify({
                        isOpen: true,
                        message: "Sory, Update Unsuccessfully",
                        type: "error"
                    });
                }
            });
        }

    }
    return (
        <div className={classes.root} >
        <FormGroup onSubmit={handleSubmit}>

            <FormLabel>
                {isAddMode 
                ? <h1>Create a teacher</h1>
                : <h1>Update teacher</h1>
                }
            </FormLabel>
            
            <Grid container className={classes.grid}>
            
                <Grid item xs={12} sm={3} className={classes.gridLeft}>
                    <FormGroup>
                    <Input
                        name="code"
                        label="Code"
                        placeholder="Ex: 197CT11122"
                        value={values.code || ""}
                        onChange={handleInputChange}
                        error={errors.code}
                        disabled={
                            !isAddMode
                            ? true
                            : false
                        }
                    />
                    <br/>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ex: Nguyễn Văn An"
                        value={values.name || ""}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <br/>
                    <RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender || "MALE"}
                        onChange={handleInputChange}
                        items={GENDER_LIST}
                    />
                    <br/>
                    <DatePicker
                        name="birthday"
                        label="Birthday"
                        value={values.birthday || new Date()}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Input
                        name="phone"
                        label="Phone"
                        placeholder="Ex: 0946111222"
                        value={values.phone || ''}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <br/>
                    <Select
                        name="positionId"
                        label="Position"
                        value={values.positionId || ''}
                        onChange={handleInputChange}
                        options={PositionListAPI() || LIST_DEFAULT()}
                        error={errors.positionId}
                    />
                    </FormGroup>

                </Grid>
                <Grid item xs={12} sm={3} className={classes.gridRight}>
                    <FormGroup>
                    <Select
                        name="academyId"
                        label="Academy"
                        value={values.academyId || ''}
                        onChange={handleInputChange}
                        options={AcademyListAPI() || LIST_DEFAULT()}
                        error={errors.academyId}
                    />
                    <br/>
                    <Select
                        name="facultyId"
                        label="Faculty"
                        value={values.facultyId || ""}
                        onChange={handleInputChange}
                        options={FacultyListAPI() || LIST_DEFAULT()}
                        error={errors.facultyId}
                    />
                    <br/>
                    <Input
                        name="email"
                        label="Email"
                        placeholder="Ex: an.197CT11122@vanlanguni.vn"
                        value={
                            ! isAddMode
                            ? values.email = values.email || ""
                            :
                                values.tickDefaultEmail 
                                ? values.email = getNameFromFullName(values.name)+ "." + values.code + "@vanlanguni.vn" 
                                : values.email 
                            
                        }
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={values.tickDefaultEmail}
                    />
                    <Checkbox
                        name="tickDefaultEmail"
                        label="Default"
                        value={values.tickDefaultEmail || false}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="username"
                        label="Username"
                        placeholder="Ex: an.197CT11122"
                        value={
                            !isAddMode
                            ? values.username || ""
                            : 
                                values.tickDefaultUsername 
                                ? values.username = getNameFromFullName(values.name)+ "." + values.code 
                                : values.username
                            
                            }
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={
                                !isAddMode
                                ? true
                                : values.tickDefaultUsername
                            }
                    />
                    <Checkbox 
                        name="tickDefaultUsername"
                        label="Default"
                        value={values.tickDefaultUsername || false}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={
                            !isAddMode 
                            ? values.password || ""
                            :
                                values.tickDefaultPassword 
                                ? values.password = values.code
                                : values.password
                           
                            }
                        onChange={handleInputChange}
                        error={errors.password}
                        disabled={
                            !isAddMode
                            ? true
                            : values.tickDefaultPassword
                        }
                    
                    />
                    <Checkbox
                        name="tickDefaultPassword"
                        label="Default"
                        value={values.tickDefaultPassword || false}
                        onChange={handleInputChange}
                    />

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
                    disabled={notFound ? true : false}
                />
                <Button
                    text="Reset"
                    color="default"
                    startIcon={<RefreshIcon />}
                    onClick={onReset} 
                />
            </Grid>
            </FormGroup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}




