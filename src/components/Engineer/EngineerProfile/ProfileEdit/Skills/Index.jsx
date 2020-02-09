import React, { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
const SkillsComponent = ({ skills, skills_engineer, skillsMask, setSkills }) => {
    useEffect(() => {
        // trik mengatasi data undefined dan array kosong
        let data =  skills_engineer && skills_engineer.length === 0
        // fix biar ga compile warning no-mix
        if(typeof skills_engineer === "undefined" || data)  {
            setSkills(skills);
        } else {
            setSkills(skills_engineer.data);
        }
    },[skills_engineer, setSkills, skills]);
    return (
        <>
            <Autocomplete
                multiple
                freeSolo
                filterSelectedOptions
                value={skillsMask} /*kalo ga pake state(uncontrolled) bakal sering ilang value nya jika di refresh dan juga kalo ada console.log() di useEffect bakal ilang value nya*/
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
