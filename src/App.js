import './App.css';
import { Coins } from './Coins';
import { GithubBirth } from './GithubBirth';
// pushing axios to the function
function App() {
  return (
    <div className="App">
      <h1>Working app?</h1>
      <Coins />
      <GithubBirth />
    </div>
  );
}
// testing of the api works

export default App;
