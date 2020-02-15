import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import defaultImage from '../../../images/default.png';
const EngineerList = ({ engineers, handlePage, currentPage, pageCount }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
                marginBottom: theme.spacing(8)
            },
        },
    }));
    const classes = useStyles();
    return (
        <>
            <Container fixed>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <div className="masonry-container">
                        { engineers && engineers.map(engineer => (
                            <div className="masonry-item" key={engineer.id}>
                                <Link className="text-white" to={`engineer/profile/${engineer.slug}`}>
                                    <img className="image rounded" src={engineer.avatar ? `http://localhost:5000/images/engineer/${engineer.avatar}` : defaultImage} alt={engineer.name} />
                                    <div className="masonry-description">
                                        <p className="mb-1">{engineer.name}</p>
                                        <p className="mb-1">{engineer.email}</p>
                                        <p className="mb-1"> Expected Salary : <span> {engineer.salary} </span> </p>
                                        <p className="mb-1"> Skills : </p>
                                        <ul>
                                            <li> {engineer.skills} </li>
                                        </ul>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="my-8">
                        <Pagination
                            count={pageCount}
                            onChange={(event, page) => handlePage(event, page)}
                            page={currentPage}
                        />
                    </div>
                </Grid>
            </Container>
        </>
    )
}
export default EngineerList
