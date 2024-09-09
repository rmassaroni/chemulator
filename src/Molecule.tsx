import { useState } from 'react';
import { iMolecule } from './types';

const Moleucule = (): iMolecule => {
    const [formula] = useState('');

    return {
        formula
    }
}

export default Moleucule;
