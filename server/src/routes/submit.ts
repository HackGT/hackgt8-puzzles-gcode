import express from 'express';
import axios from 'axios';

export let submitRoutes = express.Router();

submitRoutes.route('/').post(async (req, res) => {
    const answer = req.body.answer;
    const puzzles_url = String(process.env.MAIN_PUZZLES_URL) || "https://puzzles.hack.gt";

    let user;
    let response: any;
    if (req.user) {
        user = req.user;
    }

    console.log(user);

    if (checkAnswer(answer)) {
        console.log('answer correct!');
        await axios.post(puzzles_url.concat(`/submitEntry`), {
            uuid: user.uuid,
            puzzle_id: "merchant"
        }, {
            headers: {
                Authorization: `Bearer ${process.env.ADMIN_KEY_SECRET}`
            }
        }).then(resp => {
            console.log('response-here')
            response = res.send(resp.data);
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
