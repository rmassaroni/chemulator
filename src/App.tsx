import React, { useState } from 'react';
import { Molecule } from 'openchemlib/full';
import './App.css';

function App() {
    const [formula, setFormula] = useState<string>('');
    const [molSVG, setMolSVG] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setFormula(event.target.value);
        setError(null);
    };

    const drawMolecule = () => {
        console.log('drawing molecule');
        try {
            const molecule = Molecule.fromSmiles(formula);
            const svg = molecule.toSVG(300, 300);
            setMolSVG(svg);
            setError(null);
        } catch (error) {
            console.error('Invalid formula or SMILES input:', error);
            setMolSVG(null);
            setError('Invalid SMILES notation. Please enter a valid formula.');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            drawMolecule();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Organic Structures</h1>
            </header>
            <div>
                <div style={{ height: "10vh" }}>
                    <input
                        style={{ height: "inherit", width: `${Math.max(inputValue.length, 1)}ch` }}
                        type="text"
                        value={formula}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter chemical formula (e.g. C6H6)"
                    />
                    <button style={{ height: "inherit" }} onClick={drawMolecule}>Generate Structure</button>
                </div>
                <div className="structure">
                    {molSVG ? (
                        <div dangerouslySetInnerHTML={{ __html: molSVG }} />
                    ) : (
                            <p>Enter a valid chemical formula (e.g., SMILES notation).</p>
                        )}
                </div>

            </div>
        </div>
    );
}

export default App;
