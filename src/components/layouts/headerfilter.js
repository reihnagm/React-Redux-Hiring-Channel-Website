import React from "react"
import { withRouter } from "react-router-dom"
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core"
import "react-dropdown/style.css"

const FilterByComponentE = ({ handleFilterBy, filterByE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-filterby">Filter By</InputLabel>
      <Select
        inputProps={{
          name: "filterby",
          id: "outlined-filterby"
        }}
        label="Filter By"
        value={filterByE}
        onChange={event => handleFilterBy(event.target.value)}
      >
        <MenuItem value="latest-update">Latest Update</MenuItem>
        <MenuItem value="fullname">Name</MenuItem>
      </Select>
    </FormControl>
  )
}
const SortByComponentE = ({ handleSort, sortE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-sortby">Sort By</InputLabel>
      <Select
        inputProps={{
          name: "sortby",
          id: "outlined-sortby"
        }}
        label="Sort By"
        value={sortE}
        onChange={event => handleSort(event.target.value)}
      >
        <MenuItem value="older">Older</MenuItem>
        <MenuItem value="newer">Newer</MenuItem>
      </Select>
    </FormControl>
  )
}
const HandleShowComponentE = ({ handleShow, showE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-show">Show</InputLabel>
      <Select
        inputProps={{
          name: "Show",
          id: "outlined-show"
        }}
        label="Show"
        value={showE}
        onChange={event => handleShow(event.target.value)}
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="25">25</MenuItem>
      </Select>
    </FormControl>
  )
}
const HeaderFilter = ({ handleFilterBy, handleSort, handleShow, filterBy, sortE, showE, sortByC, sortC, limitC, location }) => {
  return (
    <div className="my-5">
      <div className="columns justify-c-around">
        <div className="column is-one-fifth">{location.pathname === "/engineers" && <FilterByComponentE handleFilterBy={handleFilterBy} filterByE={filterBy} />}</div>
        <div className="column is-one-fifth">{location.pathname === "/engineers" && <SortByComponentE handleSort={handleSort} sortE={sortE} />}</div>
        <div className="column is-one-fifth"> {location.pathname === "/engineers" && <HandleShowComponentE handleShow={handleShow} showE={showE} />}</div>
      </div>
    </div>
  )
}
export default withRouter(HeaderFilter)
