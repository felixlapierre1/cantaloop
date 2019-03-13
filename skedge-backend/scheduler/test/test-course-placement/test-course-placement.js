var expect = require('chai').expect;
var CoursePlacer = require("../../course-placement/course-placement");
var Requisites = require("../../course-placement/requisites");

var someCatalog = {
    "BasicClassA": {
        "prerequisites": [],
        "corequisites": [],
        "credits": 1
    },
    "BasicClassB": {
        "prerequisites": [],
        "corequisites": [],
        "credits": 2
    },
    "BasicClassC": {
        "prerequisites": [],
        "corequisites": [],
        "credits": 3
    },
    "HasClassACorequisite": {
        "prerequisites": [],
        "corequisites": ["BasicClassA"],
        "credits": 1
    },
    "HasClassBPrerequisite": {
        "prerequisites": ["BasicClassB"],
        "corequisites": [],
        "credits": 2
    },
    "HasClassBPrereqClassCCoreq": {
        "prerequisites": ["BasicClassB"],
        "corequisites": ["BasicClassC"],
        "credits": 2
    }
}

var someRankedCourses = ["BasicClassB", "BasicClassC", "BasicClassA", "HasClassACorequisite", "HasClassBPrereqClassCCoreq", "HasClassBPrerequisite"];

var someSemesters = [
    {"year": 2018, "season": "fall"},
    {"year": 2019, "season": "winter"},
    {"year": 2019, "season": "fall"}
]

describe('placeCourses', () => {
    it('should create empty placements if no courses are selected', () => {
        //Arrange
        var courseRecord = [];
        var courseSequence = [];
        var ranks = MockRankCourses(courseSequence);

        var coursePlacer = CreateCoursePlacer(courseRecord, courseSequence);

        //Act
        var placements = coursePlacer.PlaceCourses(someSemesters, ranks);

        //Assert
        for(var key in placements)
        {
            if(placements.hasOwnProperty(key))
            {
                expect(placements[key]).to.be.empty;
            }
        }
    })

    it('should place a course after its prerequisite when placing one course per semester', () => {
        //Arrange
        var courseRecord = [];
        var courseSequence = ["HasClassBPrerequisite", "BasicClassB"];
        var ranks = MockRankCourses(courseSequence);

        someSemesters[0].credits = 2;
        someSemesters[1].credits = 2;

        var coursePlacer = CreateCoursePlacer(courseRecord, courseSequence);

        //Act
        var placements = coursePlacer.PlaceCourses(someSemesters, ranks);

        //Assert
        var checker = new CourseChecker(placements);
        checker.isTakenBefore("BasicClassB", "HasClassBPrerequisite");
    })

    it('should place a course with its corequisite if possible', () => {
        //Arrange
        var courseRecord = [];
        var courseSequence = ["HasClassACorequisite", "BasicClassA"]
        var ranks = MockRankCourses(courseSequence);

        someSemesters[0].credits = 2;
        someSemesters[1].credits = 2;

        var coursePlacer = CreateCoursePlacer(courseRecord, courseSequence);

        //Act
        var placements = coursePlacer.PlaceCourses(someSemesters, ranks);

        //Assert
        var checker = new CourseChecker(placements);
        checker.isTakenWith("BasicClassA", "HasClassACorequisite");
    })

    it('should prioritize taking a class that is prerequisite to another', () => {
        //Arrange
        var courseRecord = [];
        var courseSequence = [ "BasicClassC", "HasClassBPrerequisite", "BasicClassB"];
        var ranks = MockRankCourses(courseSequence);

        someSemesters[0].credits = 3;
        someSemesters[1].credits = 5;

        var coursePlacer = CreateCoursePlacer(courseRecord, courseSequence);

        //Act
        var placements = coursePlacer.PlaceCourses(someSemesters, ranks);

        //Assert
        expect(placements['fall 2018']).to.include.members(['BasicClassB']);
    })

    it("Should place a course after its prerequisite and corequisite.", () => {
        //Arrange
        var courseRecord = [];
        var courseSequence = ["HasClassBPrereqClassCCoreq", "BasicClassB", "BasicClassC"];
        var ranks = MockRankCourses(courseSequence);

        someSemesters[0].credits = 4; //So there is possibility to put the class with dependencies in first semester
        someSemesters[1].credits = 5;

        var coursePlacer = CreateCoursePlacer(courseRecord, courseSequence);

        //Act
        var placements = coursePlacer.PlaceCourses(someSemesters, ranks);

        //Assert
        var checker = new CourseChecker(placements);
        checker.isTakenBefore("BasicClassB", "HasClassBPrereqClassCCoreq");
        checker.isTakenWith("BasicClassC", "HasClassBPrereqClassCCoreq");
    })

    //Check with classes in course record
})

function CreateCoursePlacer(courseRecord, courseSequence)
{
    var requisites = new Requisites(someCatalog, courseRecord, courseSequence);
    return new CoursePlacer(someCatalog, requisites);
}

function MockRankCourses(courses)
{
    var ranks = [];
    someRankedCourses.forEach(courseId => {
        if(courses.includes(courseId))
            ranks.push(courseId);
    });
    return ranks;
}

class CourseChecker
{
    
    constructor(placements)
    {
        this.order = {};
        var semesters = ['fall 2018', 'winter 2019', 'fall 2019'];
        
        for(var i = 0; i < semesters.length; i++)
        {
            var semester = semesters[i];
            placements[semester].forEach(courseId => {
                this.order[courseId] = i;
            });
        }
    }

    isTakenBefore(courseTakenBefore, courseTakenAfter)
    {
        expect(this.order[courseTakenAfter] > this.order[courseTakenBefore],
            courseTakenBefore + " should be taken before " + courseTakenAfter)
            .to.be.true;
    }

    isTakenWith(courseOne, courseTwo)
    {
        expect(this.order[courseOne] == this.order[courseTwo], 
            courseOne + " should be taken with " + courseTwo)
            .to.be.true;
    }

}