import express from 'express';
import axios from 'axios';
import {User} from '../entity/User';

export let submitRoutes = express.Router();

submitRoutes.route('/').post(async (req, res) => {
    const answer = req.body.answer;
    const puzzles_url = String(process.env.MAIN_PUZZLES_URL) || "https://puzzles.hack.gt";

    let user;
    let response: any;
    if (req.user) {
        user = await User.findOne({uuid: req.user['uuid']});
    }
    const correct = checkAnswer(answer);
    const submission = {
        value: answer,
        correct: correct,
        date: new Date()
    }
    
    user.submissions.push(submission);
    await user.save();


    if (correct) {
        console.log('answer correct!');
        await axios.post(puzzles_url.concat(`/submitEntry`), {
            uuid: user.uuid,
            name: user.name,
            puzzle_id: "makeitplace"
        }, {
            headers: {
                Authorization: `Bearer ${process.env.ADMIN_KEY_SECRET}`
            }
        }).then(resp => {
            
           response = res.send(resp.data);
            //response = res.redirect("https://puzzles.hack.gt");
        }).catch(err => {
            console.error(err);
        })
    } else {
        response = res.send({success: false, error: "Answer is incorrect!"});
    }
    return response;
});

const checkAnswer = (answer: string): boolean => {
    return answer === String(process.env.ANSWER);
}
