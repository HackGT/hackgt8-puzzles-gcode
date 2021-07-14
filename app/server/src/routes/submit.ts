import express from "express";
import axios from "axios";


export let submitRoutes = express.Router();

submitRoutes.route("/").post(async (req, res) => {
    //params: {"answer": "answer_string"}
    const answer: string = req.body.answer;
    const puzzles_url = process.env.MAIN_PUZZLES_URL || "https://puzzles.hack.gt"

    if (isCorrect(answer)) {
        axios.post(
            puzzles_url,
            JSON.stringify({
                "uuid": req.body.uuid,
                "puzzle_id": "makeitplace"
            }),
            {
                headers: {
                    'Authorization': process.env.SECRET,
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )
        .then((response) => {
            return res.send({success: true})
            })
        .catch((error => {console.log(error);}))
    }
    return res.send({sucess: false, error: "Submitted solution is wrong"})
});

function isCorrect(answer: string): boolean{
    if (answer == process.env.ANSWER) {
        return true;

    } 
    return false;

}

