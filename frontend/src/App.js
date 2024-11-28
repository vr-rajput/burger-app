import React from 'react'; 
import BurgerCart from './components/BurgerCart';

const App = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the Burger App</h1> 
            <BurgerCart/>
        </div>
    );
};

export default App;
