import { useState } from 'react';
import { Molecule } from 'openchemlib/full';
import { iMolecule } from './types';
import elementsData from 'chemical-elements';

const MoleculeComponent = (initialFormula: string = ''): iMolecule => {
    const [formula, setFormula] = useState<string>(initialFormula);
    const [molSVG, setMolSVG] = useState<string | null>(null);
    const [moleculeData, setMoleculeData] = useState<any>(null);

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

    // const getMolecularData = (formula: string): any => {
    //     const regex = /([A-Z][a-z]*)(\d*)/g;
    //     let match;
    //     let data: any = {};
    //
    //     while ((match = regex.exec(formula)) !== null) {
    //         const element = match[1];
    //         const count = match[2] === '' ? 1 : parseInt(match[2], 10);
    //
    //         if (elementsData[element]) {
    //             data[element] = elementsData[element];
    //             data[element].count = count;
    //         }
    //     }
    //     
    //     return data;
    // };

    const condensedFormula = (skeletalformula: string): string => {
        const regex = /([A-Z][a-z]*)(\1*)/g;
        return formula.replace(regex, (match, element) => {
            const count = match.length / element.length;
            return count > 1 ? `${element}${count}` : element;
        });
    }

    const skeletalFormula = (formula: string): string => {
        const regex = /([A-Z][a-z]*)(\d*)/g;

        return formula.replace(regex, (match, element, count) => {
            const num = count === '' ? 1 : parseInt(count, 10);
            return element.repeat(num);
        });
    }

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
        condensedFormula,
        skeletalFormula
    }
}

export default MoleculeComponent;
