import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const SkillsComponent = ({ datasSkillsEngineer, datasSkillsIdEngineer, skills, skillsMask, setSkills }) => {
    let dataSkillsEngineerArrayObject = []; 
    let array_skills = datasSkillsEngineer !== null && datasSkillsEngineer.split(",");
    let array_skills_id = datasSkillsIdEngineer !== null && datasSkillsIdEngineer.split(",");
    for (let i = 0; i <  array_skills.length; i++) {
       dataSkillsEngineerArrayObject.push({
           id: parseInt(array_skills_id[i]),
           name: array_skills[i]
       });
   }
    useEffect(() => {
        setSkills(dataSkillsEngineerArrayObject);
    },[setSkills]);
    if(skillsMask === null) {
        return false;
    }
    return (
        <>
            <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                /* kalo ga pake state(uncontrolled) akan sering ilang value nya 
                jika di refresh dan juga 
                kalo ada perubahan pada code editor kadang datanya ilang value nya */
                value={skillsMask}
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
