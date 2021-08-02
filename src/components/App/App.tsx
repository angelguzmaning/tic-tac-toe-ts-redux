import { Board } from '../Board/Board';

function App() {
  return (
    <div className='App'>
      <Board squares={[null, 'X', null, 'O', 'O', 'X', 'X', null, null]} />
    </div>
  );
}

export default App;
