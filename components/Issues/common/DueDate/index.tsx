// Libraries
import {DatePicker, Spin} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import moment from 'moment';

// Constants
import {dateTimeFormat} from 'constants/index';
import {RELOAD_ISSUE, RELOAD_ISSUES} from 'constants/event';
import {STATUS_RESOLVED} from 'constants/issues';

// Services
import * as issueServices from 'services/issue';

// Helpers
import {handelError, isEditIssue} from 'helpers';
import emitter from 'helpers/mitt';

// Typings
import {SizeType} from 'antd/lib/config-provider/SizeContext';

// Antd
const {RangePicker} = DatePicker;

interface DueDateProps {
    issue: any;
    size: SizeType;
    projectId: any;
    role: string;
}

const DueDate: React.FC<DueDateProps> = ({size, issue, role, projectId}) => {
    // State
    const [value, setValue] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const dueDate = !issue.dueDate || issue.dueDate === '0001-01-01T00:00:00Z'
            ? null
            : moment(issue.dueDate);

        const startDate = !issue.startDate || issue.startDate === '0001-01-01T00:00:00Z'
            ? null
            : moment(issue.startDate);

        setValue([startDate, dueDate]);
    }, [issue.dueDate, issue.startDate]);

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current < moment().endOf('day');
    };

    const isDated = useMemo(() => {
        const current = moment().format();

        return value[1] ? moment(current).isAfter(issue.dueDate) : false;
    }, [issue.dueDate]);

    const onOk = async (value: any) => {
        setValue(value);

        updateIssue(value);
    };

    const updateIssue = async (value: any) => {
        setLoading(true);

        try {
            const params = {
                id: issue.id,
                assignee: issue.assignee,
                dueDate: value[1] ? moment(value[1]).format() : null,
                startDate: value[0] ? moment(value[0]).format() : null,
                priority: issue.priority,
                status: issue.status
            };

            await issueServices.update({
                id: projectId,
                type: 'update-issue',
                issue: {...params}
            });

            emitter.emit(RELOAD_ISSUES);
            emitter.emit(RELOAD_ISSUE);
        } catch (error) {
            handelError();
        } finally {
            setLoading(false);
        }
    };

    const onChange = (value: any) => {
        if (value === null) {
            setValue([]);

            updateIssue([]);
        }
    };

    return (
        <Spin spinning={isLoading}>
            <RangePicker
                onChange={onChange}
                style={
                    isDated && issue.status !== STATUS_RESOLVED
                        ? {borderColor: '#820014', color: 'red', background: '#ffccc7'}
                        : {}
                }
                size={size}
                disabledDate={disabledDate}
                disabled={!isEditIssue(role) || issue.status === STATUS_RESOLVED}
                value={value}
                placeholder={['Start date','Due date']}
                showTime={{format: 'HH:mm'}}
                format={dateTimeFormat}
                onOk={onOk}
            />
        </Spin>
    );
};

export default DueDate;
