/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// libraries
import React from 'react';
import {useRouter} from 'next/router';

// Components
import Setting from 'components/Projects/Setting';

// Interface
interface ProjectSettingProps {
    
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const ProjectSetting: React.FC<ProjectSettingProps> = () => {
    const router = useRouter();
    const {pid} = router.query;

    return (
        <Setting pId={pid} />
    );
};

export default ProjectSetting;