import React from "react";
import { CourseParts } from '../types';

const Total = (props: CourseParts) => {
    return <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
};

export default Total;