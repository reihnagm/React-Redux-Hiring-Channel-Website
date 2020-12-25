import React from "react"

const ProfileSkillsItem = ({ items }) => {
  return (
    <>
      {items &&
        items.map(skill => (
          <p className={`tag-${skill.color} margin-normal`} key={skill.uid}>
            {skill.name}
          </p>
        ))}
    </>
  )
}

export default ProfileSkillsItem
