const Project = require("../models/project");
const Time = require("../models/time");
const { ApolloServer, gql  } = require('apollo-server');

const typeDefs = gql`

    type Time {
        id: ID
        amount: Int
        description: String
        project: Project
    }

    type Project {
        id: ID
        name: String
        description: String
        times: [Time] 
    }


    type Query {
        projects: [Project]
        project(id: ID): Project
        times: [Time]
        time(id: ID): Time
    }
    
    type Mutation {
        addProject(name: String, description: String) : Project
        removeProject(id: ID): Project
        updateProject(id: ID, name: String, description: String) : Project
        addTime(amount: Int, description: String, projectId: ID) : Time
        removeTime(id: ID): Time
    }
 `

const resolvers = {
    Query: {
        projects: () => Project.find({}),
        project: (parent, args) => {
            return Project.findById(args.id)
        },
        times: (parent, args) => {
            return Time.find({projectId: parent.id})
        },
        time: (parent, args) => {
            return Time.findById(args.id)
        }
    },
    Mutation: {
        addProject: (parent, args) => {
            let project = new Project({
                name: args.name,
                description: args.description
            });
            return project.save();
        },
        removeProject: async (parent, args) => {
            await  Project.findOneAndRemove({_id: args.id}, (error, deletedRecord) => {
                if(!error) {    
                    return deletedRecord
                } else {
                    console.log(error)
                }
            }).then((res) => {
                // delete all time records for this project
                Time.deleteMany({projectId: args.id}, (err, data) => {
                    if(!err) {
                        console.log("success")
                    } else {
                        console.log(err )
                    }

                })
            })
            return true
        },
        updateProject: (parent, args) => {
            return Project.findByIdAndUpdate({ _id: args.id }, {name: args.name, description: args.description},
                function (err, result) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        return result
                    }
                }
            )
        },
        addTime: (parent, args) => {
            let time = new Time({
                amount: args.amount,
                description: args.description,
                projectId: args.projectId
            });
            return time.save();
        },
        removeTime: (parent, args) => {
            return Time.findOneAndRemove({_id: args.id}, (error, deletedRecord) => {
                if(!error) {
                    return deletedRecord
                } else {
                    console.log(error)
                }
            })
        }
    },
    Project: {
        times: (parent) => {
            return Time.find({projectId: parent.id})
        }
    }
}
module.exports = {typeDefs, resolvers};
