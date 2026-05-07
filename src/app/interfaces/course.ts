// Interface för hur kurser med datatyper ska vara när det hämtas in från webbtjänsten
export interface Course {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
    added?: boolean; // Om knappen har klickats på eller inte
}
