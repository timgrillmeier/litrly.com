let inputHue = document.getElementById('input-hue')
let inputHueValue = '36'
let inputSaturation = document.getElementById('input-saturation')
let inputSaturationValue = '92'
let inputLightness = document.getElementById('input-lightness')
let inputLightnessValue = '68'
let partyModeActive = false;

let listPresets = document.getElementById('preset-list')
let presets = [
    {h:344, s:97, l:39},
    {h:255, s:95, l:56},
    {h:181, s:95, l:94},
    {h:41, s:92, l:88},
    {h:29, s:92, l:100},
  ]

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

document.addEventListener('load', loadPresets())

function cookiesConsent(a) {
  let cookiesConsentMessage = document.getElementById('cookie-consent')
  console.log(a)
  
  if (a == 'approved') {
    setCookie('cookies_allowed', 'true', 365)
    // take current presets array
    let savePresetButton = document.getElementById('save-preset-button')
    savePresetButton.classList.add('new-animation')

    presets = [{h:parseInt(inputHueValue),s:parseInt(inputSaturationValue),l:parseInt(inputLightnessValue)}].concat(presets)

    cookiePresetsJSON = JSON.stringify(presets)
    setCookie('presets', cookiePresetsJSON, 365)

    setTimeout(() => {
      savePresetButton.classList.remove('new-animation')
      displayPresets()
    },600)
  } else if (a == 'disallowed') {

  }

  cookiesConsentMessage.style.opacity = 0
}

function changeColor() {
  let hsl = "hsl("+ inputHueValue + ", " + inputSaturationValue + "%, " + inputLightnessValue + "%)"
  let inputSatBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 0%, 50%) 0%, hsl("+ inputHueValue + ", 100%, 50%) 100%);"
  inputSaturation.style = inputSatBGStr
  
  inputLightBGStr = "background: linear-gradient(to right, hsl("+ inputHueValue + ", 100%, 0%) 0%, hsl("+ inputHueValue + ", 100%, 50%), hsl("+ inputHueValue + ", 100%, 100%) 100%);"
  inputLightness.style = inputLightBGStr

  document.body.style.background = hsl

  // setCookie('cookies_allowed', 'true', 365)
  let cookiesAllowed = getCookie('cookies_allowed')
  if (cookiesAllowed != '') {
    setCookie('backgroundstyle',JSON.stringify({h:inputHueValue, s:inputSaturationValue, l:inputLightnessValue}),365)
  }

  if (inputLightnessValue < 40) {
    document.body.classList.add('theme-dark')
  } else {
    document.body.classList.remove('theme-dark')
  }
}

function applyPreset(h, s, l) {
  inputHueValue = h
  inputHue.value = h

  inputSaturationValue = s
  inputSaturation.value = s

  inputLightnessValue = l
  inputLightness.value = l

  changeColor()
}

function loadPresets() {
  // Start party mode loop
  partyModeRun()

  // check cookies
  let cookiePresetsJSON = getCookie('presets')

  // update presets array
  if (cookiePresetsJSON != '') {
    console.log(cookiePresetsJSON)
    presets = JSON.parse(cookiePresetsJSON)
    let bgstr = getCookie('backgroundstyle')
    if (bgstr != '') {
      let backgroundStyle = JSON.parse(bgstr)
      let hsl = "hsl("+ backgroundStyle.h + ", " + backgroundStyle.s + "%, " + backgroundStyle.l + "%)"

      inputHue.value = backgroundStyle.h
      inputHueValue = backgroundStyle.h
      inputSaturation.value = backgroundStyle.s
      inputSaturationValue = backgroundStyle.s
      inputLightness.value = backgroundStyle.l
      inputLightnessValue = backgroundStyle.l

      changeColor()

      document.body.style.background = hsl
    }
  }

  // display presets
  displayPresets()
}

function savePreset() {
  let cookiesAllowed = getCookie('cookies_allowed')

  console.log(cookiesAllowed)
  if (cookiesAllowed == '') {
    let cookiesConsentMessage = document.getElementById('cookie-consent')
    cookiesConsentMessage.style.opacity = 1
    return
  }


  // take current presets array
  let savePresetButton = document.getElementById('save-preset-button')
  savePresetButton.classList.add('new-animation')

  presets = [{h:parseInt(inputHueValue),s:parseInt(inputSaturationValue),l:parseInt(inputLightnessValue)}].concat(presets)

  cookiePresetsJSON = JSON.stringify(presets)
  setCookie('presets', cookiePresetsJSON, 365)

  setTimeout(() => {
    savePresetButton.classList.remove('new-animation')
    displayPresets()
  },600)
}

function removePreset(h, s, l, i) {
  let preset = document.getElementById('container-preset-' + i)
  preset.classList.add('delete-animation')

  console.log('i:',i)
  console.log('before:',presets)


  presets.splice(i, 1)

  cookiePresetsJSON = JSON.stringify(presets)
  setCookie('presets', cookiePresetsJSON, 365)

  console.log('after:',presets)

  setTimeout(() => {
    // preset.classList.remove('delete-animation')
    displayPresets()
  },600)
}

function displayPresets() {
  // let docFrag = document.createDocumentFragment();

  // let newTag = document.createElement('link')
  // newTag.setAttribute('rel', 'stylesheet')

  // docFrag.appendChild(newTag)

  let shard = document.getElementById('preset-list')
  shard.innerHTML = ''
  
  for (let i = 0; i < presets.length; i++) {
    let newTag = document.createElement('span')
    newTag.setAttribute('class', 'container-preset')
    newTag.setAttribute('id', 'container-preset-' + i)

    let newChildTagA = document.createElement('span')
    newChildTagA.setAttribute('class', 'preset')
    newChildTagA.setAttribute('style', 'background: hsl('+ presets[i].h +', '+ presets[i].s +'%, '+ presets[i].l +'%)')
    newChildTagA.setAttribute('onclick', 'applyPreset('+ presets[i].h +', '+ presets[i].s +', '+ presets[i].l +')')
    newTag.appendChild(newChildTagA)

    let newChildTagB = document.createElement('span')
    newChildTagB.setAttribute('class', 'delete')
    newChildTagB.setAttribute('onclick', 'removePreset('+ presets[i].h +', '+ presets[i].s +', '+ presets[i].l +', '+ i +')')
    // docFrag.appendChild(newTag)
    let cookiesAllowed = getCookie('cookies_allowed')
    if (cookiesAllowed != '') {
      newTag.appendChild(newChildTagB)
    }

    shard.appendChild(newTag)
  }

  
  // shard.attachShadow({ mode: 'open' })
  // shard.appendChild(docFrag)
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  let cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
  document.cookie = cookie
  console.log('cookie',cookie)
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function togglePartyMode() {
  partyModeActive = !partyModeActive
}

function partyModeRun() {
  setInterval(function(){
    if (partyModeActive) {
      inputHueValue++
      if (inputHueValue > 360) {
        inputHueValue = 0
      }
      inputHue.value = inputHueValue
      changeColor()
    }
  },15)
}














