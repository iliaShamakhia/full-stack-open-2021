import React from "react";
import { PartProps } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = (props: PartProps) => {
    switch(props.part.type){
        case 'normal':
            return (
                <div>
                    <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
                    <p><em>{props.part.description}</em> </p>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                    <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
                    <p>project exercises {props.part.groupProjectCount}</p>
                </div>
            )
        case 'submission':
            return (
                <div>
                    <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
                    <p><em>{props.part.description}</em></p>
                    <p>submit to {props.part.exerciseSubmissionLink}</p>
                </div>
            )
        case 'special':
            return(
                <div>
                    <p><strong>{props.part.name} {props.part.exerciseCount}</strong></p>
                    <p><em>{props.part.description}</em></p>
                    <p>required skills: {props.part.requirements.map((el,i) => i==0?el:", "+el)}</p>
                </div>
            )
        default:
            return assertNever(props.part);
    }
    
}

export default Part;