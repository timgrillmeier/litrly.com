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
  let inputSatBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 0%, 50%) 0%, hsl("+ inputHueValue + ", 100%, 50%) 100%);"
  inputSaturation.style = inputSatBGStr
  
  inputLightBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 100%, 0%) 0%, hsl("+ inputHueValue + ", 100%, 50%), hsl("+ inputHueValue + ", 100%, 100%) 100%);"
  inputLightness.style = inputLightBGStr

  document.body.style.background = hsl
}

