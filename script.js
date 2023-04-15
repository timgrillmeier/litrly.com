let inputHue = document.getElementById('input-hue')
let inputHueValue = '36'
let inputSaturation = document.getElementById('input-saturation')
let inputSaturationValue = '92'
let inputLightness = document.getElementById('input-lightness')
let inputLightnessValue = '68'

inputHue.addEventListener('input', function(e) {
  inputHueValue = this.value
  changeColor()
});

inputSaturation.addEventListener('input', function(e) {
  inputSaturationValue = this.value
  changeColor()
});

inputLightness.addEventListener('input', function(e) {
  inputLightnessValue = this.value
  changeColor()
});

function changeColor() {
  let hsl = "hsl("+ inputHueValue + ", " + inputSaturationValue + "%, " + inputLightnessValue + "%)"
  // console.log("linear-gradient(to right, hsl("+ inputHueValue + ", " + 0 + "%, " + inputLightnessValue + "%) 0%, hsl("+ inputHueValue + ", " + 100 + "%, " + inputLightnessValue + "%) 100%);")
  let inputSatBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 0%, 50%) 0%, hsl("+ inputHueValue + ", 100%, 50%) 100%);"
  inputSaturation.style = inputSatBGStr
  console.log(inputSatBGStr)
  
  inputLightBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 100%, 0%) 0%, hsl("+ inputHueValue + ", 100%, 50%), hsl("+ inputHueValue + ", 100%, 100%) 100%);"
  inputLightness.style = inputLightBGStr
  console.log(inputLightBGStr)

  

  // console.log(hsl)
  // inputHue.style.color = hsl
  // inputHue.style.color = hsl
  document.body.style.background = hsl
}

changeColor()