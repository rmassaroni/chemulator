import React, { useState } from 'react';
import { Molecule } from 'openchemlib/full';
import './App.css';

function App() {
    const [formula, setFormula] = useState<string>('');
    const [molSVG, setMolSVG] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="App">
            <header className="App-header">
                <h1>Chemistry Skeletal Structure Viewer</h1>
            </header>
            <div>
                <input
                    type="text"
                    value={formula}
                    onChange={handleInputChange}
                    placeholder="Enter chemical formula (e.g. C6H6)"
                />
                <button onClick={drawMolecule}>Generate Structure</button>
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
