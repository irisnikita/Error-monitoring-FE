/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React, {useMemo} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

// Helpers
import {date} from 'helpers/format';

// Styles
import styles from './styles.module.scss';
import Title from 'antd/lib/typography/Title';

// Interface
interface DailyErrorChartProps {
    errors?: error[],
    height?: any
}

type error = {
        time: string,
        count: number
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
const DailyErrorChart: React.FC<DailyErrorChartProps> = ({errors, height}) => {
    // Format error to data chart
    const data = useMemo(() => {
        return errors ? errors.map(error => ({
            name: error.time,
            error: error.count
        })) : [];
    }, [errors]);

    return (
        <div >
            <Title level={5}>Daily Errors</Title>
            <ResponsiveContainer width='100%' height={height}>
                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar maxBarSize={80} dataKey='error' fill='#006d75' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

DailyErrorChart.defaultProps = {
    height: 500,
    errors: [
        {time: date('12-02-2020', 'DD-MM-YYYY'), count: 20},
        {time: date('12-03-2020', 'DD-MM-YYYY'), count: 10},
        {time: date('12-04-2020', 'DD-MM-YYYY'), count: 5},
        {time: date('12-05-2020', 'DD-MM-YYYY'), count: 20}
    ]
};

export default DailyErrorChart;