import "./style.css"

const inputBodySizeElement = document.querySelector("#body-size")
const inputAgeElement = document.querySelector("#age")
const inputWeightElement = document.querySelector("#weight")
const inputActivityElement = document.querySelector("#activity")
const inputGenderElement = document.getElementsByName("gender")
const calculateButton = document.querySelector("#calculate-btn")
const outputBMRkcal = document.querySelector("#output-bmr-kcal")
const outputBMRkJ = document.querySelector("#output-bmr-kj")
const outputTDEEkcal = document.querySelector("#output-tdee-kcal")
const outputTDEEkJ = document.querySelector("#output-tdee-kj")

function getPalFactor() {
  const activity = Number(inputActivityElement.value)
  switch (activity) {
    case 0:
      return 0.95
      break
    case 1:
      return 1.2
      break
    case 2:
      return 1.5
      break
    case 3:
      return 1.7
      break
    case 4:
      return 1.9
      break
    case 5:
      return 2.2
      break
    default:
      return 0
  }
}

function getBMR(weight, size, age, gender) {
  let weightFactor
  let sizeFactor
  let ageFactor

  if (gender === "female") {
    weightFactor = 9.6 * weight
    sizeFactor = 1.8 * size
    ageFactor = 4.7 * age
    return 655.1 + weightFactor + sizeFactor - ageFactor
  }
  if (gender === "male") {
    weightFactor = 13.7 * weight
    sizeFactor = 5 * size
    ageFactor = 6.8 * age
    return 655.1 + weightFactor + sizeFactor - ageFactor
  }
  return 0
}

calculateButton.addEventListener("click", function (e) {
  const bodySize = Number(inputBodySizeElement.value)
  const age = Number(inputAgeElement.value)
  const weight = Number(inputWeightElement.value)
  const palFactor = getPalFactor()
  const gender = Array.from(inputGenderElement).find((r) => r.checked).value
  const bmr = getBMR(weight, age, bodySize, gender)
  const tdee = bmr * palFactor

  outputBMRkcal.innerText = bmr.toFixed(2)
  outputBMRkJ.innerText = (bmr * 4.184).toFixed(2)

  outputTDEEkcal.innerText = tdee.toFixed(2)
  outputTDEEkJ.innerText = (tdee * 4.184).toFixed(2)
})
