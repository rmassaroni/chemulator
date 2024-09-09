import React, { useState } from 'react';
import './App.css';
import MoleculeComponent from './Molecule';

function App() {
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const molecule = MoleculeComponent('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError(null);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            molecule.setFormula(inputValue);
            molecule.drawMolecule(inputValue);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{ alignSelf: "center" }}>Chemulator</h1>
                <input
                    style={{ width: `${Math.max(inputValue.length, 10)}ch`, fontSize: "xx-large", padding: "5px", alignSelf: "center" }}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="(e.g. C6H6)"
                />
            </header>
            <div className='page'>
                <div className='page-header'>Molecule: {molecule.formula}</div>
                <h2>Condensed Formula: {molecule.condensedFormula(molecule.formula)}</h2>
                {molecule.SkeletalStructure()}
            </div>
        </div>
    );
}

export default App;
