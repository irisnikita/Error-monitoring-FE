/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';

// Components
import Create from 'components/Projects/Create';

interface CreateProjectProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const CreateProject: React.FC<CreateProjectProps> = () => {
    return (
        <Create />
    );
};

export default CreateProject;