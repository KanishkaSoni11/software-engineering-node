"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseDao_1 = __importDefault(require("./CourseDao"));
const SectionDao_1 = __importDefault(require("./SectionDao"));
mongoose_1.default.connect('mongodb://localhost:27017/cs5500-test-123');
const sectionDao = SectionDao_1.default.getInstance();
const courseDao = CourseDao_1.default.getInstance();
// courseDao
//     .addSectionToCourse("61ec897218898f8a4c3ff7c8", "61ecd42ad36f1e52c243953d")
//     .then(result => console.log(result));
// courseDao.findAllCoursesDeep()
//     .then(courses => console.log(courses));
// sectionDao.findAllSectionsDeep()
//     .then(sections => console.log(sections));
// courseDao.deleteCourse('61ec835fba16e6188136169b')
//     .then(status => console.log(status));
// courseDao.updateCourse(
//     '61ec835fba16e6188136169b',
//     {title: 'new title'}
// ).then(status => console.log(status));
// courseDao.findCourseById('61ec835fba16e6188136169b')
//     .then(course => console.log(course));
courseDao.findAllCourses()
    .then(courses => console.log(courses));
// courseDao.createCourse({
//     title: 'CS1234'
// })
// .then(course => console.log(course));
