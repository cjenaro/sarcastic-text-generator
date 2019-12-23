const SARCASTIC = 'sarcastic'
const UNABLE_TO_STRUCTURE_A_SENTENCE = 'unable'
const FUNKY = 'funky'
const YODA = 'yoda'

const radios = document.querySelectorAll('input[type="radio"]')
const textarea = document.querySelector('textarea')
const transformedText = document.querySelector('#transformed-text')
let selectedRadio = 'sarcastic'

const funkyLetters = {
  '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
};

radios.forEach(radio =>
  radio.addEventListener('change', e => {
    selectedRadio = e.currentTarget.id
    transformedText.innerText = generateText(textarea.value, selectedRadio)
  })
)

function sarcastic(text) {
  return Array.from(text).map(char => {
    if (Array.from(text).indexOf(char) % 2) {
      char = char.toUpperCase()
    }

    return char
  }).join('')
}

function unable(text) {
  return text.replace(/ /g, ' ...')
}

function yoda(text) {
  let splitted = text.split(',')
  let generated = ''
  if (splitted.length > 1) {
    generated = [
      ...splitted.slice(1),
      ...splitted.slice(0, 1)
    ].join(', ')
  } else {
    const spaceInHalf = Math.floor(text.replace(/[^ ]/g, "").length/2)
    splitted = text.split(' ')
    generated = [
      ...splitted.slice(spaceInHalf),
      ...splitted.slice(0, spaceInHalf)
    ].join(' ')
  }

  return generated
}

function funky(text) {
  return Array.from(text).map(char => {
    const funkyChar = funkyLetters[char]
    return !!funkyChar ? funkyChar : char
  }).join('')
}

function generateText(text, radioValue) {
  let generatedText = text
  switch (radioValue) {
    case SARCASTIC:
      generatedText = sarcastic(text)
      break
    case FUNKY:
      generatedText = funky(text)
      break
    case UNABLE_TO_STRUCTURE_A_SENTENCE:
      generatedText = unable(text)
      break
    case YODA:
      generatedText = yoda(text)
      break
    default:
      break
  }

  return generatedText
}

textarea.addEventListener('input', e => {
  let generatedText = generateText(e.currentTarget.value, selectedRadio)
  transformedText.innerText = generatedText
})
