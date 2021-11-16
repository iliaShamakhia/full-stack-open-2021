export interface HeaderProps {
    courseName: string;
}

export interface Parts {
    name: string;
    exerciseCount: number;
}

export interface CourseParts {
    courseParts: Array<CoursePart>;
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
  
export interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
export interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseRequirementsPart extends CourseDescriptionPart {
    type: "special";
    requirements: Array<string>;
}

export interface CourseDescriptionPart extends CoursePartBase {
    description: string;
}
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;

export interface PartProps {
    part: CoursePart;
}