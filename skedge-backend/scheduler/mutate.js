/**
 * creates a offspring with a mutation that differentiates it from its parent 
 *  
 * @param individual parent the base for the individual to be created
 * @param {*} sectionList the object containing all the relevant sections for this genome
 * @returns an individual with one allele different than the parent
 */

const individual = require('./individual.js');

function mutate(parent, sectionList)
{
    //console.log(sectionList);
    console.log("This semester"+ parent.semester);
    var offpring = individual(parent.semester);
    console.log("offspring semester: "+ offpring.semester);

    var mutantCourse = parent.genome[Math.floor(parent.genome.length* Math.random())]; 
    var alleles = sectionList[mutantCourse];
    var newAllele = alleles[Math.floor(alleles.length* Math.random())];

    offspring.semester[mutantCourse] = newAllele;
    
    return offpring;
}

module.exports = mutate;