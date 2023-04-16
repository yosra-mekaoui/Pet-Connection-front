import axios from 'axios';

async function translateText(text, targetLanguage) {
  const options = {
    method: 'POST',
    url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1179f3b153msh6098dabc7917d65p160579jsnf2656b48ce7a',
      'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
    },
    data: JSON.stringify({
      from: 'en',
      to: targetLanguage,
      q: text
    })
  };

  const response = await axios.request(options);
  return response.data;
}

export default translateText;
