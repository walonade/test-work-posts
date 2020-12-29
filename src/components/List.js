import React, {useCallback, useState} from "react"
import {Button, Container, Grid, List, ListItem, ListItemText, Typography, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core"
export default props => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangeRowsPerPage = useCallback(event => setRowsPerPage(+event.target.value))
    const handleChangePage = useCallback(newPage => {
        const validNewPage = Math.max(Math.min(newPage, props.posts.length <= rowsPerPage ? 0 : Math.ceil(props.posts.length / rowsPerPage)), 0)
        setPage(validNewPage)
    })
    const posts = props.posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => (
        <ListItem alignItems="center" divider={true} key={post.id} >
            <ListItemText primary={post.text} secondary={`автор: ${post.author}`} />
        </ListItem>
    ))
    return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center">Посты</Typography>
            { props.posts.length > 0 ?
                <>
                    <List>{posts}</List>
                    <Grid container justify="space-between" style={{marginBottom: 20}}>
                        <Typography variant="subtitle2">страница: {page + 1} из {Math.ceil(props.posts.length / rowsPerPage)}</Typography>
                        <FormControl variant="outlined" style={{width: 100}}>
                            <InputLabel id="select-label">постов на странице</InputLabel>
                            <Select
                            labelId="select-label"
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            label="постов на странице"
                            >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container justify="space-between">
                        <Button onClick={handleChangePage.bind(null, page - 1)} color="primary" variant="contained">прошлая страница</Button>
                        <Button onClick={handleChangePage.bind(null, page + 1)} color="primary" variant="contained">следующая страница</Button>
                    </Grid>
                </>
            : <Typography variant="subtitle1">постов нет</Typography> }
        </Container>
    )
}