// Libraries
import React from 'react';
import {DatePicker} from 'antd';

// Constants
import {dateFormat} from 'constants/index';

// Antd 
const {RangePicker} = DatePicker;

interface DateRangeProps {
    name: string,
    value: any,
    onChange: Function
}

const DateRange: React.FC<DateRangeProps> = ({
    name,
    value,
    onChange
}) => {
    return (
        <RangePicker size='large' className='w-full' value={value} format={dateFormat} onChange={(value) => {onChange(value, name)}}  />
    );
};

export default DateRange;