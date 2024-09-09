import { useState } from 'react';
import { Molecule } from 'openchemlib/full';
import { iMolecule } from './types';

const MoleculeComponent = (initialFormula: string = ''): iMolecule => {
    const [formula, setFormula] = useState<string>(initialFormula);
    const [molSVG, setMolSVG] = useState<string | null>(null);

    const drawMolecule = (form: string) => {
        console.log('drawing molecule');
        try {
            const molecule = Molecule.fromSmiles(form);
            const svg = molecule.toSVG(100, 100);
            setMolSVG(svg);
        } catch (error) {
            console.error('Invalid formula or SMILES input:', error);
            setMolSVG(null);
        }
    };

    const SkeletalStructure = (): JSX.Element => (
        <div>
            {molSVG ? (
                <div className='structure'>
                    <h2>Structure</h2>
                    <div style={{ transform: "scale(4)" }}dangerouslySetInnerHTML={{ __html: molSVG }} />
                </div>
            ) : (
                    <p style={{ fontSize: "x-large", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Enter a valid chemical formula in SMILES notation to begin.</p>
                )}
        </div>
    );

    return {
        formula, setFormula,
        drawMolecule,
        SkeletalStructure,
    }
}

export default MoleculeComponent;
