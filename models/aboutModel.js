import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const aboutSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image_url:{
            type: String,
            required: true
        },
        section:{
            type: String,
            required: true
        }
    },

    {
        collection: 'about',
        timestamps: true,
    }

);

const About = model('About', aboutSchema);
export default About;