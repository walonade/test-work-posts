import React, {useState, useCallback} from "react"
import {Grid, TextField, Button, Typography, Container, Snackbar } from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
const styles = makeStyles({
    input: {
        marginBottom: 10,
        marginTop: 10
    }
})
export default props => {
    const classes = styles()
    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [mistake, setMistake] = useState(false)
    const [textMistake, setTextMistake] = useState("")
    const handleCloseMistake = useCallback(() =>  setMistake(false), [mistake])
    const handleSetAuthor = useCallback(event => setAuthor(event.target.value), [author])
    const handleSetText = useCallback(event => setText(event.target.value), [text])
    const addPost = useCallback(() => {
        const regexp = /^[a-z\s]+$/i;
        if(author === "" || text === "") {
            setTextMistake("все поля должны быть заполнены")
            setMistake(true)
        } else if(!regexp.test(author)) {
            setTextMistake("имя автора должно быть на латинице")
            setMistake(true)
        } else {
            props.addPost({author, text})
        }
    })
    return (
        <Container maxWidth="sm">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={mistake}
                onClose={handleCloseMistake}
                message={textMistake}
            />
            <Grid item container justify="center" direction="column">
                <Typography align="center" variant="h5">Форма добавления поста</Typography>
                <TextField label="Имя автора"
                    value={author}
                    required
                    onChange={handleSetAuthor}
                    className={classes.input}
                    type="text" 
                    variant="outlined"/>
                <TextField label="Текст поста"
                    value={text}
                    required
                    onChange={handleSetText}
                    className={classes.input} 
                    type="text" 
                    multiline
                    rows={6}
                    variant="outlined"/>
                <Button variant="contained"
                        onClick={addPost} 
                        className={classes.input} 
                        color="primary">Добавить пост</Button>
            </Grid>
        </Container>
    )
}