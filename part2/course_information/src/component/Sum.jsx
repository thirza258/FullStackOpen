import React from 'react';

function Sum({sum}) {
    const total = sum.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
        <div>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    );
}

export default Sum;