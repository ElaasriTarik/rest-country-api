fetching();
function fetching() {
  fetch('data.json')
  .then(response => response.json())
  .then(data =>{
    asign_to(data)
    display_all_countries(data)
  }).catch(error => console.log('ERROR:',error))

}
let cc;
function asign_to(data) {
  cc = data;
}
  let results_section = document.querySelector('.results_section')
function display_all_countries(countries) {
  console.log(countries);
  const htmlString = countries.map((item, i) => {
    return `
    <div class="country_front c${i}">
      <div class="country_front_flag">
        <img src="${item.flags.png}" alt="" class="country_flag">
      </div>
      <div class="main_info">
        <h2 class="country_main_name">${item.name}</h2>
        <div class="sub_info">

            <div class="sub_box">
            <p class="sub_label">Population: </p>
            <p class="sub_light_label">${item.population}</p>
          </div>
          <div class="sub_box">
          <p class="sub_label">Region: </p>
          <p class="sub_light_label">${item.region}</p>
        </div>
        <div class="sub_box">
        <p class="sub_label">Capital: </p>
        <p class="sub_light_label">${item.capital}</p>
      </div>
        </div>
      </div>
    </div>
    `
  }).join('')
  results_section.innerHTML = htmlString;
  let country_front = document.querySelectorAll('.country_front')
  activate_events(country_front, countries)
}
function activate_events(cc, countries) {
  cc.forEach((item, i) => {
    item.addEventListener('click', () => {
      let clicked_country = parseInt(item.classList[1].slice(1));
      show_country(clicked_country, countries)
    })

  });

}
function show_country(c_country, countries) {
  const langs = countries[c_country].languages.map((item) => {
    return `
      <p>${item.name}</p>
    `
  }).join(', ')
  const borders = countries[c_country].borders === undefined ? null:countries[c_country].borders.map((item) => {
    const bb = countries.filter((ele) => {
      return ele.cioc == item
    })
    console.log(bb);
    return `
       <h3 class="border_name" style="display:${bb[0] === undefined? "none":"block"}">${bb[0] === undefined ? null:bb[0].name}</h3>

    `
  }).join('')
  console.log(countries[c_country]);
  results_section.classList.remove("off")
  results_section.classList.add("on")
  results_section.innerHTML = `
  <div class="chosen_country">
  <div class="back_btn_box">
  <p class="back">Back</p>
  </div>
  <div class="chosen_main_info">
  <div class="chosen_image_box">
  <img src="${countries[c_country].flags.png}" alt="" class="chosen_image">
  </div>
  <div class="chosen_info">
  <h2 class="country_name"> ${countries[c_country].name}</h2>
  <div class="chosen_sub_info">

  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Native Name: </p>
  <p class="chosen_sub_light_label">${countries[c_country].nativeName}</p>
  </div>
  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Population: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].population}</p>
  </div>
  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Region: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].region}</p>
  </div>
  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Sub Region: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].subregion}</p>
  </div>
  <div class="chosen_sub_box break_here">
  <p class="chosen_sub_label">Capital: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].capital}</p>
  </div>

  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Top Level Domain: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].topLevelDomain[0]}</p>
  </div>
  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Currencies: </p>
  <p class="chosen_sub_light_label"> ${countries[c_country].currencies[0].code}</p>
  </div>
  <div class="chosen_sub_box">
  <p class="chosen_sub_label">Languages: </p>
  <p class="chosen_sub_light_label"> ${langs}</p>
  </div>
  </div>
  <div class="borders_box">
  <h2 class="border_c_label">Border Countries</h2>
  <div class="borders">
     ${borders}
  </div>
  </div>
  </div>
  </div>
  </div>
  `
  console.log();
  let back_btn_box = document.querySelector('.back_btn_box');
  console.log(back_btn_box);
  activate_back(back_btn_box)
}
function activate_back(btn) {
  btn.addEventListener('click', () => {
    results_section.classList.remove("on")
    results_section.classList.add("off")
    fetching()
  })
}
let options = document.querySelectorAll('.opt')
options.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const this_region = cc.filter((ele) => {
      if (e.target.value === "all") {
        return ele
      } else {
        return ele.region === e.target.value
      }
    })
    display_all_countries(this_region)
  })
});
const searchBox = document.querySelector('.searchBox')

searchBox.addEventListener('input', (e) => {
  const filtered =  cc.filter((item) => {
    return item.name.toLowerCase().includes(e.target.value.toLowerCase())
  })
  display_all_countries(filtered)
})
