"use strict";

/** Routes for exercises */
const axios = require("axios");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { NUTRITION_API_KEY } = require("../config");


const router = new express.Router();

/** GET / =>  {meals: [
 *                      0: {
 *                      id: num,
 *                      title: text,
 *                      readyInMinutes: num,
 *                      image: text,
 *                      imageUrls: [
 *                          0: text,
 *                          1: text,]}]
 *              nutrients: {
 *                      calories:1988
 *                      protein:55.64
 *                      fat:121.19
 *                      carbohydrates:177.96        
 *                      }}
 * 
 *  returns a meal plan for 1 day based on the users inputs (calories, diet, restrictions)
 * */

router.post("/", async function (req, res, next) {

    let { calories, diet, exclude } = req.body

    try {
        const response = await axios.get("https://api.spoonacular.com/mealplanner/generate", {
            params: {
                apiKey: NUTRITION_API_KEY,
                timeFrame: "day",
                targetCalories: calories,
                diet,
                exclude,
            },
        });

        const { meals, nutrients } = response.data;

        res.json({ meals, nutrients });
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data.message;
            res.status(status).json({ error: message });
        } else if (error.request) {
            res.status(500).json({ error: "API request failed" });
        } else {
            next(error);
        }
    }

})



module.exports = router;
