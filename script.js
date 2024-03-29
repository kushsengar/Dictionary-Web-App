const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');


async function dictionaryFn(word){
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    console.log(res);
    return res[0];
}
async function fetchAndCreateCard(){
    const data = await dictionaryFn(input.value);
    let partofSpeechArray = [];
    for(let i=0 ; i<data.meanings.length ; i++){
        partofSpeechArray.push(data.meanings[i].partOfSpeech)
    }
    dictionary.innerHTML = `<div class="card">
    <div class="property">
        <span>Word:</span>
        <span>${data.word}</span>
    </div>
    <div class="property">
        <span>Phonetics:</span>
        <span>${data.phonetic}</span>
    </div>
    <div class="property">
        <span>
        <audio controls src="${data.phonetics[0].audio}"></audio>
        </span>
    </div>
    <div class="property">
        <span>Definition:</span>
        <span>${data.meanings[0].definitions[0].definition}</span>
    </div>
    <div class="property">
        <span>Example:</span>
        <span>${data.meanings[1].definitions[0].example}</span>
    </div>
    <div class="property">
        <span>${partofSpeechArray.map(e => e).join(', ')}</span>
    </div>
</div>`
}
btn.addEventListener('click',fetchAndCreateCard);
