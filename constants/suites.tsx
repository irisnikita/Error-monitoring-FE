import React from 'react';

export const TEST_FAILED = 'failed';
export const TEST_SKIPPED = 'skipped';
export const TEST_PASSES = 'passed';
export const TEST_PENDING = 'pending';

export const getTestIcon = (status: string) => {
    switch (status) {
        case TEST_FAILED:
            
            return <i className='icon-hvh-cancel-circle' style={{color: '#cf1322'}} />;
    
        case TEST_PENDING:
            
            return <i className='icon-hvh-loop2' />;
    
        case TEST_SKIPPED:
            
            return <i className='icon-hvh-blocked' />;
    
        case TEST_PASSES:
            
            return <i style={{color: '#389e0d'}} className='icon-hvh-checkmark' />;
    
        default:
            return <i style={{color: '#389e0d'}} className='icon-hvh-checkmark' />;
    }
};