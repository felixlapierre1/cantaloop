var expect = require('chai').expect;
var individual = require("../semester-generation/individual.js");
var generation = require("../semester-generation/generation.js").generation;
var CourseConflictFitness = require("../semester-generation/fitnessfunctions.js").CourseConflictFitness;
var TimeRestrictionFitness = require("../semester-generation/fitnessfunctions.js").TimeRestrictionFitness;



describe( 'rankMultigenerationFitness', function(){
    it('should create a descendant with a better average fitness than the parent using rankGeneration', function()
    {
        // arrange
        var sectionList = 
        {
            "COMP346" : [
                { // A
                "lecture" : { "code":"A", "time_start":"8:45","time_end":"10:00","days":"TuTh" },
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
                },
                { //A2
                    "lecture" : { "code":"A2", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                    "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                    "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
                },
                { // A4
                    "lecture" : { "code":"A4", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                    "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                    "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
                },],
            "SOEN341" : [
                {
                    "lecture" : {  "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                    "tutorial" : {  "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
                },
                { // B1
                "lecture" : { "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                "tutorial" : { "code":"B1", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict
                },
                { // B2
                    "lecture" : { "code":"B2", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                    "tutorial" : { "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
                },
                { //B3
                    "lecture" : { "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                    "tutorial" : { "code":"B3", "time_start":"15:45","time_end":"17:00","days":"Fr" } //conflict
                }, 
                { //B4
                    "lecture" : { "code":"B4", "time_start":"9:45","time_end":"10:15","days":"TuTh" },//conflict
                    "tutorial" : { "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
                }],
            "SOEN331" : [
                { // C
                    "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                    "tutorial" : { "code":"C", "time_start":"14:45","time_end":"16:00","days":"Mo" } 
                },
                { // C1
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C1", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict
                },
                { // C3
                    "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                    "tutorial" : { "code":"C3", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict 
                }]
        };
        var semester = [];
        semester[0] = // pure single conflict
        {
            "COMP346" : {
                "lecture" : { "code":"A", "time_start":"8:45","time_end":"10:00","days":"TuTh" },
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
            },
            "SOEN341" : {
                "lecture" : { "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                "tutorial" : { "code":"B1", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict
            },
            "SOEN331" : {
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C1", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict
            }
        };
        semester[1] = // pure double conflict
        {
            "COMP346" : {
                "lecture" : { "code":"A2", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
            },
            "SOEN341" : {
                "lecture" : { "code":"B2", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                "tutorial" : { "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
            },
            "SOEN331" : {
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C", "time_start":"14:45","time_end":"16:00","days":"Mo" } 
            }
        };
        semester[2] = // partial single conflict
        {
            "COMP346" : {
                "lecture" : { "code":"A", "time_start":"8:45","time_end":"10:00","days":"TuTh" },
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
            },
            "SOEN341" : {
                "lecture" : { "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                "tutorial" : { "code":"B3", "time_start":"15:45","time_end":"17:00","days":"Fr" } //conflict
            },
            "SOEN331" : {
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C3", "time_start":"14:45","time_end":"16:00","days":"Fr" } //conflict 
            }
        };
        semester[3] = // partial double conflict
        {
            "COMP346" : {
                "lecture" : { "code":"A4", "time_start":"8:45","time_end":"10:00","days":"TuTh" }, //conflict
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A", "time_start":"10:15","time_end":"11:30","days":"Mo" }
            },
            "SOEN341" : {
                "lecture" : { "code":"B4", "time_start":"9:45","time_end":"10:15","days":"TuTh" },//conflict
                "tutorial" : { "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
            },
            "SOEN331" : {
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C", "time_start":"14:45","time_end":"16:00","days":"Mo" } 
            }
        };
        semester[4] = // GOOD
        {
            "COMP346" : {
                "lecture" : { "code":"A", "time_start":"8:45","time_end":"10:00","days":"TuTh" },
                "tutorial" : { "code":"A", "time_start":"14:45","time_end":"16:00","days":"We" },
                "lab" : { "code":"A",  "time_start":"10:15","time_end":"11:30","days":"Mo" }
            },
            "SOEN341" : {
                "lecture" : {  "code":"B", "time_start":"10:15","time_end":"11:30","days":"TuTh" },
                "tutorial" : {  "code":"B", "time_start":"14:45","time_end":"16:00","days":"Fr" } 
            },
            "SOEN331" : {
                "lecture" : { "code":"C", "time_start":"8:45","time_end":"10:00","days":"MoWe" },
                "tutorial" : { "code":"C", "time_start":"14:45","time_end":"16:00","days":"Mo" } 
            }
        };
        var restrictions = [{ "time_start":"02:00","time_end":"04:00","days":"Mo"}];
        var fitnessFunctions = [ new CourseConflictFitness(), new TimeRestrictionFitness(restrictions)];

        var oldGeneration = [];
        for (let i = 0; i < 4; i++) {
            oldGeneration[i] = new individual(semester[0]);
            oldGeneration[i+4] = new individual(semester[1]);
            oldGeneration[i+8] = new individual(semester[2]);
            oldGeneration[i+12] = new individual(semester[3]);
            oldGeneration[i+16] = new individual(semester[4]);
            
        }
        
        oldGeneration.forEach(individual => {
            fitnessFunctions.forEach(fitnessFunction => {
                fitnessFunction.EvaluateFitness(individual);
            });
        });

        var oldGenAverage = 0;
        var newGenAverage = 0;
        oldGeneration.every(function(val)
        {
            oldGenAverage += val.fitness;
            return true;
        });

        oldGenAverage = oldGenAverage/20;

        // act
        var newGeneration = new generation(oldGeneration, fitnessFunctions, sectionList, 20);
        
        for (let i = 0; i < 100; i++) { 
            var temp = new generation(oldGeneration, fitnessFunctions, sectionList, 20);
            oldGeneration = newGeneration;
            newGeneration = temp;
        }

        newGeneration.every(function(val)
        {     
            newGenAverage += val.fitness;
            return true;
        });
        newGenAverage = newGenAverage/20;

        expect(newGenAverage).to.be.greaterThan(oldGenAverage);


    });

});