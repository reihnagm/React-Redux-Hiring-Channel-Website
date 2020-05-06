import React, { useEffect, Fragment } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const SkillsComponent = ({ datasSkillsEngineer, skills, setSkills, skillsMask }) => {
  // let data = [];
  // let array_skills = datasSkillsEngineer !== null && datasSkillsEngineer.split(","); jadiin array dengan pemisah koma
  // let array_skills_id = datasSkillsIdEngineer !== null && datasSkillsIdEngineer.split(","); // jadiin array dengan pemisah koma
  // for (let i = 0; i <  array_skills.length; i++) {
  //   data.push({
  //     id: parseInt(array_skills_id[i]),
  //     name: array_skills[i]
  //   });
  // }
  useEffect(() => {
    setSkills(datasSkillsEngineer);
  },[setSkills]); // kalo dia tipe datanya array maka akan
  // freeze karena terjadi perubahan dan perulangan terus menerus
  if(skillsMask === null) {
    return false;
  }
  return (
    <Fragment>
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
    </Fragment>
  )
}
export default SkillsComponent;
