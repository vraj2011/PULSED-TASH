const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    let media;

    // bonus challenge: 3-way check — image, youtube, or direct video
    if (data.media_type === "image") {
      media = `<img src="${data.url}" alt="${data.title}" />`;
    } else if (data.url.includes("youtube")) {
      // nasa sometimes sends youtube embeds — <video> won't work for those
      media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      media = `<video src="${data.url}" controls></video>`;
    }

    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p>${data.explanation}</p>
    `;
  })
  .catch(err => {
    // if anything goes wrong — no internet, bad key, api down — show the error
    document.querySelector("#app").innerHTML = `<p class="error">something went wrong: ${err.message}</p>`;
  });