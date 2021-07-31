// import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6">React Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <ReactPlayer url="https://www.youtube.com/watch?v=r6qWEteVMyM&list=PL4OKShK9gkQca9QVqmnPMzT6QYM2LHaqt&index=3"
        muted={false} playing={true}/>
      </Container>
    </>
  );
}

export default App;