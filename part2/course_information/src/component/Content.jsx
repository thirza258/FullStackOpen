import React from 'react';

const Content = ({ parts }) => {
    // Accessing the 'parts' array from the 'course' object

    return (
        <div>
            {/* Check if parts is not null/undefined */}
            {parts && parts.length > 0 ? (
                <ul>
                    {parts.map(part => (
                        // Ensure each item in the list has a unique key
                        <li key={part.id}>{part.name} {part.exercises}</li>
                    ))}
                </ul>
            ) : (
                // Show a message or component if parts is empty
                <p>No content available</p>
            )}
        </div>
    );
};

export default Content;