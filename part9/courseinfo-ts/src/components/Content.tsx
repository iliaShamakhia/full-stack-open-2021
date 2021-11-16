import React from "react";
import { CourseParts } from '../types';
import Part from "./Part";
  
const Content = (props: CourseParts) => {
    return <div>
        {props.courseParts.map(part => <Part key={part.name} part={part}/>)}
    </div>
};

export default Content;