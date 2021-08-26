const graphql = require("graphql");
const _= require("lodash");
const db = require("../db")
const Project = require("../models/project");
const Time = require("../models/time");

const {
        GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLNonNull,
        GraphQLList
}= graphql;

// dummy data
var projects = [
    {name: "project1", description:"desc1", id:1},
    {name: "project2", description:"desc2", id:2},
    {name: "project3", description:"desc3", id:3}
];

var times = [
    {amount: 25, description: "clear data", id: 1, projectId: 1},
    {amount: 26, description: "cshow me your knowledge", id: 2, projectId: 3},
    {amount: 16, description: "bring water to programmers", id: 4, projectId: 3},
    {amount: 5, description: "clear cache from memory", id: 5, projectId: 3},
    {amount: 27, description: "clear data3", id: 3, projectId: 2}
]

// get project after id with times records
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields: () => ({
        id: {type: GraphQLID}, // this is added to return the ID also
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        times: {
            type: new GraphQLList(TimeType),
            resolve(parent, args) {
                // query return project by times maybe not used
                return Time.find({projectId: parent.id})
            }
        }
    })
})

// get time after id with project at which is assigned to
const TimeType = new GraphQLObjectType({
    name:'Time',
    fields: () => ({
        id: {type: GraphQLID},
        amount: {type: GraphQLInt},
        description: {type: GraphQLString},
        project: {
            type: ProjectType,
            resolve(parent, args) {
                // query
                return Project.findById(parent.projectId)
            }
        }
    })
})

// read data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                // query
                let prj = Project.findById(args.id)
                return Project.findById(args.id)
            }
        },
        time: {
            type: TimeType,
            args: {id: {type:GraphQLInt }},
            resolve(parent, args) {
                // query
                return Time.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                //    query return projects
                return Project.find({})
            }
        },
        times: {
            type: new GraphQLList(TimeType),
            resolve(parent, args) {
                // query return times
                return Time.find({})
            }
        }
    }
});


// change data

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) }, // not null REQUIRED
                description: {type: GraphQLString }
            },
            resolve(parent, args) {
                let project = new Project({
                    name: args.name,
                    description: args.description
                });
                return project.save();

            }
        },
        addTime: { // time function
            type: TimeType,
            args: {
                amount: {type: GraphQLInt},
                projectId: {type: GraphQLID},
                description: {type: GraphQLString}
            },
            resolve(parent, args) {
                let time = new Time({
                    amount: args.amount,
                    projectId: args.projectId,
                    description: args.description
                });
                return time.save();
            }
        },
        updateProject: {
            type:ProjectType,
            args: {
                id: {type: GraphQLID},
                name:  {type: GraphQLString},
                description:  {type: GraphQLString}
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate({ _id: args.id }, {name: args.name, description: args.description},
                    function (err, result) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        return result
                    }
                });
            }
        },
        removeProject: {
            type: ProjectType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                return Project.findOneAndRemove({_id: args.id}, (error, deletedRecord) => {
                    if(!error) {
                        // console.log("delete", deletedRecord)
                        // maybe something else will be returned from here
                        return deletedRecord
                    } else {
                        console.log(error)
                    }
                })
            }
        },
        removeTime: {
            type: TimeType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                return Time.findOneAndRemove({_id: args.id}, (error, deletedRecord) => {
                    if(!error) {
                        // console.log("delete", deletedRecord)
                        // maybe something else will be returned from here
                        return deletedRecord
                    } else {
                        console.log(error)
                    }
                })
            }
        }
        
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
