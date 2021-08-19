// Libraries
import React, {useMemo} from 'react';
import {Select} from 'antd';

// Antd
const {Option} = Select;

// Services
import {ENV_LIST} from 'constants/project';

interface SelectProjectProps {
    name: string,
    value: any,
    placeholder: string,
    onChange: Function
}

const SelectProject: React.FC<SelectProjectProps> = ({
    value, name, onChange, placeholder
}) => {

    const options: any[] = useMemo(() => {
        return [ {key: '', label: 'All'}, ...ENV_LIST];
    }, [ENV_LIST]);

    return (
        <Select className='w-full' size='large' placeholder={placeholder} value={value} onChange={(value) => onChange(value, name)}>
            {Array.isArray(options) ? options.map(option => (
                <Option key={option.key} value={option.key}>
                    {option.label}
                </Option>
            )) : null}
        </Select>
    );
};

export default SelectProject;