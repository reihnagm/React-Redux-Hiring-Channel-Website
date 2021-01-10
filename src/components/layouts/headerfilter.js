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
const FilterByComponentC = ({ handleFilterBy, filterByC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-filterby">Filter By</InputLabel>
      <Select
        inputProps={{
          name: "filterby",
          id: "outlined-filterby"
        }}
        label="Filter By"
        value={filterByC}
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
const SortByComponentC = ({ handleSort, sortC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-sortby">Sort By</InputLabel>
      <Select
        inputProps={{
          name: "sortby",
          id: "outlined-sortby"
        }}
        label="Sort By"
        value={sortC}
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
const HandleShowComponentC = ({ handleShow, showC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-show">Show</InputLabel>
      <Select
        inputProps={{
          name: "Show",
          id: "outlined-show"
        }}
        label="Show"
        value={showC}
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
const HeaderFilter = ({ handleFilterBy, handleSort, handleShow, filterByE, sortE, showE, filterByC, sortC, showC, location }) => {
  return (
    <div className="my-5">
      <div className="columns justify-c-around">
        {location.pathname === "/engineers" && (
          <>
            <div className="column is-one-fifth">
              <FilterByComponentE handleFilterBy={handleFilterBy} filterByE={filterByE} />
            </div>
            <div className="column is-one-fifth">
              <SortByComponentE handleSort={handleSort} sortE={sortE} />
            </div>
            <div className="column is-one-fifth">
              <HandleShowComponentE handleShow={handleShow} showE={showE} />
            </div>
          </>
        )}
        {location.pathname === "/companies" && (
          <>
            <div className="column is-one-fifth">
              <FilterByComponentC handleFilterBy={handleFilterBy} filterByC={filterByC} />
            </div>
            <div className="column is-one-fifth">
              <SortByComponentC handleSort={handleSort} sortC={sortC} />
            </div>
            <div className="column is-one-fifth">
              <HandleShowComponentC handleShow={handleShow} showC={showC} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default withRouter(HeaderFilter)
