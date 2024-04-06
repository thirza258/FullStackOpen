import React from 'react';
import Content from './Content';
import Header from './Header';
import Sum from './Sum';

function Course({course}) {
    const course_name = course.name
    const parts = course.parts

    if(course.length > 1) {
        return (
            <div>
                {course.map(course => (
                    <div key={course.id}>
                        <Header header={course.name} />
                        <Content parts={course.parts} />
                        <Sum sum={course.parts} />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <Header header={course_name} />
            <Content parts={course.parts} />
            <Sum sum={course.parts}/>
        </div>
    );
}

export default Course;