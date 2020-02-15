import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const SkillsComponent = ({ skills, dataSkillsEngineerArrayObject, skillsMask, setSkills }) => {
    useEffect(() => {
        if(dataSkillsEngineerArrayObject.length !== 0) {
            setSkills(dataSkillsEngineerArrayObject);
        }
    },[setSkills, skills]);
    return (
        <>
            <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                value={skillsMask} /* kalo ga pake state(uncontrolled) bakal sering ilang value nya jika di refresh dan juga kalo ada perubahan pada code editor kadang datanya ilang value nya */
                options={skills.data}
                onChange={(event, getSkills) => {
                    setSkills(getSkills);
                }}
                getOptionLabel={skills => skills.name}
                getOptionSelected={(option, value) => {
                    return option.id === value.id
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        label="Skills"
                        fullWidth
                    />
                )}
            />
        </>
    )
}
export default SkillsComponent;
