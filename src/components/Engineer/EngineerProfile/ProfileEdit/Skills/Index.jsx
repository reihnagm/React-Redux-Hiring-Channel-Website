import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const SkillsComponent = ({ datasSkillsEngineer, datasSkillsIdEngineer, skills, skillsMask, setSkills }) => {
    let dataSkillsEngineerArrayObject = [];
    let array_skills = datasSkillsEngineer.split(",");
    let array_skills_id = datasSkillsIdEngineer.split(",");
    for (let i = 0; i < array_skills.length; i++) {
       dataSkillsEngineerArrayObject.push({
           id: parseInt(array_skills_id[i]),
           name: array_skills[i]
       });
   }
    useEffect(() => {
        setSkills(dataSkillsEngineerArrayObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    let data;
    if(skillsMask === null) {
        return false;
    } else {
        data = skillsMask
    }
    return (
        <>
            <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                /* kalo ga pake state(uncontrolled) bakal sering ilang value nya jika di refresh dan juga kalo ada perubahan pada code editor kadang datanya ilang value nya */
                value={data}
                options={skills}
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
