// Libraries
import React, {useEffect, useState} from 'react';
import {Select} from 'antd';

// Antd
const {Option} = Select;

// Services
import * as projectService from 'services/project';
import {handelError} from 'helpers';

interface SelectProjectProps {
    name: string,
    value: any,
    placeholder: string,
    onChange: Function
}

const SelectProject: React.FC<SelectProjectProps> = ({
    value, name, onChange, placeholder
}) => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        setLoading(true);
        try {
            const response = await projectService.get();
            
            if (response && response.data) {
                const {data} = response.data;

                setProjects(data);

                onChange(data[0].id, name);
            }
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select className='w-full' size='large' placeholder={placeholder} value={value} loading={isLoading} onChange={(value) => onChange(value, name)}>
            {projects.map(project => (
                <Option key={project.id} value={project.id}>
                    {project.name}
                </Option>
            ))}
        </Select>
    );
};

export default SelectProject;