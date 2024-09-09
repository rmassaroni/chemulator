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
            const svg = molecule.toSVG(100, 100);
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
                <h1 style={{ alignSelf: "center" }}>Chemulator</h1>
                    <input
                        style={{ width: `${Math.max(inputValue.length, 28.1)}ch`, fontSize: "xx-large", padding: "5px", alignSelf: "center" }}
                        type="text"
                        value={formula}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter chemical formula (e.g. C6H6)"
                    />
            </header>
            <div>
                <div style={{ height: "10vh" }}>

                </div>
                <div className="structure">
                    {molSVG ? (
                        <div style={{ transform: "scale(4)" }}dangerouslySetInnerHTML={{ __html: molSVG }} />
                    ) : (
                            <p>Enter a valid chemical formula in SMILES notation to begin.</p>
                        )}
                </div>

            </div>
        </div>
    );
}

export default App;
