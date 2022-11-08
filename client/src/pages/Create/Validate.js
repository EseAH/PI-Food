const validTitle = /^[a-z .]+$/i;
const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
const validNum = /^\d+$/;

function validate(input) {
    let errors = {}
    if (!input.title || !validTitle.test(input.title) || input.title.length < 5) {
        errors.title = "Error title. Only letters and more than 5 characters are allowed"
    }
    if (!validUrl.test(input.image)) {
        errors.image = "Error image. Url required"
    }
    if (!input.diets) {
        errors.diets = "Diet required"
    }
    if (!input.summary || !validTitle.test(input.summary) || input.summary.length < 50) {
        errors.summary = "Error summary. Only letters and more than 50 characters are allowed"
    }
    if (!input.healthScore || !validNum.test(input.healthScore) || input.healthScore < 1 || input.healthScore > 100) {
        errors.healthScore = "Error healthScore. Number required between 1 and 100"
    }
    if (!input.steps || !validTitle.test(input.steps) || input.steps.length < 50) {
        errors.steps = "Error steps. Only letters and more than 50 characters are allowed"
    }
    
    return errors
}

module.exports = { validate }