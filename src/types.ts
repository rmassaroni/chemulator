export interface iMolecule {
    formula: string;
    setFormula: (formula: string) => void;
    drawMolecule: (form: string) => void;
    SkeletalStructure: () => JSX.Element;
    condensedFormula: (skeletalformula: string) => string;
    skeletalFormula: (formula: string) => string;
}
